import React from "react";
import { createRoot } from "react-dom/client";
import { sleep } from "./sleep";
import { Content } from "./content";

const App = () => {
  sleep(2);
  return (
    <div>
      Hello world
      <Content />
    </div>
  );
};

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(<App />);
