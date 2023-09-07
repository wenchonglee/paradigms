import handler from "serve-handler";
import express from "express";
import { createReadStream } from "node:fs";

const app = express();

app.use(async (req, res) => {
  await handler(
    req,
    res,
    {
      public: "static",
    },
    {
      // middleware that sets an arbitrary delay for all files
      async createReadStream(path, config) {
        // await new Promise((resolve) => setTimeout(resolve, path.includes(".js") ? 2000 : 1000));

        return createReadStream(path, config);
      },
    }
  );
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
