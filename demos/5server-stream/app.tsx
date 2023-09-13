import * as React from "react";

export function App() {
  const [clientMessage, setClientMessage] = React.useState("");

  React.useEffect(() => {
    setClientMessage("Hello From React");
  });

  return (
    <html>
      <head>
        <link rel="stylesheet" href="styles.css" />
        <link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" />
        <link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" />
        <title>5server-stream</title>
      </head>

      <body>
        <h1>Team list</h1>
        <mark>{clientMessage}</mark>

        <React.Suspense fallback={<div>loading...</div>}>
          <Posts />
        </React.Suspense>

        <div className="footer">Footer</div>
      </body>
    </html>
  );
}

const Posts = () => {
  const data = suspensed(fetchData());

  return (
    <div className="card-list">
      {data.map((user) => (
        <div className="card" key={user.id} onClick={() => alert(`${user.name}!`)}>
          <img src={user.avatar} />
          <div>
            <div className="card-name">{user.name}</div>
            <div className="card-email">{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

function suspensed(promise) {
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      (result) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}

let cache = new Map();

export function fetchData(url = "users") {
  if (typeof window !== "undefined") return new Promise((resolve) => resolve([]));
  if (!cache.has(url)) {
    cache.set(url, getData());
  }
  return cache.get(url);
}

async function getData() {
  const response = await fetch("http://localhost:5000");
  const data = await response.json();
  await sleep();
  console.log(data);
  return data;
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));
