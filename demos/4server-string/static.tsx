import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./app";

/**
 *
 * This is the "entry point" on the client side
 * We bundle this separately as a static JS file
 *
 */

//@ts-ignore
const data = window.__DATA__;
hydrateRoot(document.getElementById("root") as HTMLElement, <App data={data} />);
