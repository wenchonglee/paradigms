import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";

type AppData = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

const getUsers = async () => {
  const response = await fetch("http://localhost:5000");
  const data = await response.json();

  return data;
};

export const Users = () => {
  const [users, setUsers] = useState<AppData[]>([]);

  useEffect(() => {
    const updateState = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    updateState();
  }, []);

  return (
    <div>
      <h1>Team list</h1>

      <div className="card-list">
        {users.map((user) => (
          <Link className="card" key={user.id} href={`/users/${user.id}`}>
            <img src={user.avatar} />
            <div>
              <div className="card-name">{user.name}</div>
              <div className="card-email">{user.email}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const getUser = async (userId: string) => {
  const response = await fetch(`http://localhost:5000/users/${userId}`);
  const data = await response.json();

  return data;
};

export const User = () => {
  const params = useParams();
  const [user, setUser] = useState<AppData | null>(null);

  useEffect(() => {
    const updateState = async () => {
      const data = await getUser(params.userId);
      setUser(data);
    };
    updateState();
  }, []);

  return (
    <div>
      <Link href="/">Go back</Link>

      <div className="card-list">
        {user && (
          <div className="card">
            <img src={user.avatar} />
            <div>
              <div className="card-name">{user.name}</div>
              <div className="card-email">{user.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
