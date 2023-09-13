import express from "express";
import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "./app";
import { DataProvider } from "./provider";

const app = express();

app.get("/", (_req, res) => {
  const { pipe } = renderToPipeableStream(
    // <DataProvider data={data}>
    <App />,
    //  </DataProvider>
    {
      bootstrapScripts: ["/build/static.js"],
      onShellReady() {
        res.setHeader("content-type", "text/html");
        pipe(res);
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

  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, 3000);
      });
      throw promise;
    },
  };
}
