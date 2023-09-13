import express from "express";
import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "./app";
import { DataProvider, data } from "./provider";

import { Writable } from "node:stream";

const app = express();

app.get("/", (_req, res) => {
  /**
   * We create our own writable stream
   * `write` will have a default behavior
   * `final` will add a script to attach the data received into a global variable
   */

  const stream = new Writable({
    write(chunk, _encoding, cb) {
      res.write(chunk, cb);
    },
    final() {
      // this script is sometimes a millisecond slower (?) and causes a desync on client side
      // because the received state will be undefined
      res.write(
        `<script>
        window.globalCache=${JSON.stringify(data)}
        </script>`
      );
      res.end("</body></html>");
    },
  });

  const { pipe } = renderToPipeableStream(
    <DataProvider data={createServerData()}>
      <div id="root">
        <App />
      </div>
    </DataProvider>,
    {
      bootstrapScripts: ["/build/static.js"],
      onShellReady() {
        res.setHeader("content-type", "text/html");
        res.write(
          `<html><head>
            <link rel="stylesheet" href="styles.css" />
            <link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" />
            <link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" />
            <title>5server-stream</title>
          </head><body>`
        );

        pipe(stream);
      },
    }
  );
});

app.use(express.static("./static"));

app.listen(3005, () => {
  console.log("Listening on port 3005");
});

function createServerData() {
  let done = false;
  let promise: Promise<void> | null = null;
  let result;

  return {
    read() {
      if (done) {
        return result;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise((resolve) => {
        getData().then((data) => {
          done = true;
          promise = null;
          result = data;
          resolve();
        });
      });
      throw promise;
    },
  };
}

async function getData() {
  const response = await fetch("http://localhost:5000");
  const data = await response.json();
  await sleep();
  return data;
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));
