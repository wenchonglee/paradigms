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
      // route all paths to index.html, required for SPA behavior
      // rewrites: [{ source: "!**/*.js", destination: "/index.html" }],
    },
    {
      // middleware that sets an arbitrary delay for all files
      async createReadStream(path, config) {
        await new Promise((resolve) => setTimeout(resolve, path.includes(".js") ? 2000 : 1000));

        return createReadStream(path, config);
      },
    }
  );
});

app.listen(3003, () => {
  console.log("Listening on port 3003");
});
