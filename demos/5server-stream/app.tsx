import React, { useState, useEffect, Suspense } from "react";
import { useData } from "./provider";

export function App() {
  return (
    <>
      <h1>Team list</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Posts />
      </Suspense>

      <div className="footer">Footer</div>
    </>
  );
}

const Posts = () => {
  const data = useData();
  // const data = suspensed(fetchData());
  // if (!data) return null;

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
  return data;
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));
