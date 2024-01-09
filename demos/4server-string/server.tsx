import express from "express";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "./app";

const app = express();

app.get("/", async (_req, res) => {
  /**
   * Fetch the data on the server before rendering it
   */
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch("http://localhost:5000");
  const data = await response.json();

  /**
   * Convert a React component into an HTML string
   */
  const app = ReactDOMServer.renderToString(<App data={data} />);

  /**
   * Why does this line exist?
   *    <script>window.__DATA__ = ${JSON.stringify(data)}</script>
   *
   * For hydration to work, we need the document sent to the client AND the rendered document to be the same
   * Otherwise, you will encounter this error "Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server."
   *
   * To that end, we also send the state required to render the same document in the browser's window. You can see how it is being used in app.tsx
   * This might seem extremely hacky, but it is actually the same approach used by NextJS!
   */
  const html = `
        <html lang="en">
        <head>
            <link rel="stylesheet" href="styles.css">
            <link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin />
            <link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin />
            <script src="build/static.js" async defer></script>
            <title>4server-string</title>
        </head>
        <body>
            <div id="root">${app}</div>
            <script>window.__DATA__ = ${JSON.stringify(data)}</script>
        </body>
        </html>
    `;
  res.status(200).send(html);
});

app.use(express.static("./static"));

app.listen(3004, () => {
  console.log("Listening on port 3004");
});
