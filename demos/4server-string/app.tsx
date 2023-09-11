import * as React from "react";
import { sleep } from "./sleep";

type AppProps = {
  data: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  }[];
};

export function App(props: AppProps) {
  const { data } = props;
  const [clientMessage, setClientMessage] = React.useState("");

  React.useEffect(() => {
    // Simulate a slow app and adding 2 seconds to Total Blocking Time (TBT)
    if (typeof window !== "undefined") {
      console.log("rendering..");
      sleep(2);
    }

    setClientMessage("This message is rendered on the client");
  }, []);

  return (
    <>
      <h1>Team list</h1>
      <mark>{clientMessage}</mark>

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

      <div className="footer">Footer</div>
    </>
  );
}
