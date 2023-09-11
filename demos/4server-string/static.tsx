import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./app";

//@ts-ignore
const data = window.__DATA__;
hydrateRoot(document.getElementById("root") as HTMLElement, <App data={data} />);
