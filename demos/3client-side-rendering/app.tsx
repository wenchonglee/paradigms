import React from "react";
import { createRoot } from "react-dom/client";
import { sleep } from "./sleep";
import { User, Users } from "./users";
import { Link, Route } from "wouter";

const App = () => {
  // sleep(2);
  return (
    <>
      <Route path="/">
        <Users />
      </Route>

      <Route path="/users/:userId">
        <User />
      </Route>
      <div className="footer">Footer</div>
    </>
  );
};

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(<App />);
