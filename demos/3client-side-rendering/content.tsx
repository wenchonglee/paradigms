import React from "react";
import { useEffect, useState } from "react";

const getData = async () => {
  const response = await fetch("http://localhost:5000");
  const data = await response.json();

  return data;
};

export const Content = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const updateState = async () => {
      const data = await getData();
      setState(data);
    };
    updateState();
  }, []);

  return (
    <div>
      <ul>
        {state.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
