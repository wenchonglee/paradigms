import express from "express";
import cors from "cors";
import handler from "serve-handler";

const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send(users);
});

app.get("/users/:userId", (req, res) => {
  res.send(users.find((user) => `${user.id}` === req.params.userId));
});

app.use("/images", async (req, res) => {
  await handler(req, res, {
    public: "images",
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

const users = [
  {
    id: 1,
    name: "Sofia Davis",
    email: "sofia.davis@domain.com",
    avatar: "http://localhost:5000/images/1.png",
  },
  {
    id: 2,
    name: "Olivia Martin",
    email: "olivia.martin@domain.com",
    avatar: "http://localhost:5000/images/2.png",
  },
  {
    id: 3,
    name: "Sofia Davis",
    email: "sofia.davis@domain.com",
    avatar: "http://localhost:5000/images/3.png",
  },
  {
    id: 4,
    name: "Jackson Lee",
    email: "jackson.lee@domain.com",
    avatar: "http://localhost:5000/images/4.png",
  },
  {
    id: 5,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@domain.com",
    avatar: "http://localhost:5000/images/5.png",
  },
  {
    id: 6,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@domain.com",
    avatar: "http://localhost:5000/images/6.png",
  },
  {
    id: 7,
    name: "Bret Pilgram",
    email: "bret.pilgram@domain.com",
    avatar: "http://localhost:5000/images/7.png",
  },
  {
    id: 8,
    name: "Olenka Gherardi",
    email: "olenka.gherardi@domain.com",
    avatar: "http://localhost:5000/images/8.png",
  },
  {
    id: 9,
    name: "Janifer Goodbourn",
    email: "janifer.goodbourn@domain.com",
    avatar: "http://localhost:5000/images/9.png",
  },
  {
    id: 10,
    name: "Sloan Worvill",
    email: "sloan.worvill@domain.com",
    avatar: "http://localhost:5000/images/10.png",
  },
  {
    id: 11,
    name: "Tiebout Offer",
    email: "tiebout.offer@domain.com",
    avatar: "http://localhost:5000/images/11.png",
  },
  {
    id: 12,
    name: "Kayla Lukash",
    email: "kayla.lukash@domain.com",
    avatar: "http://localhost:5000/images/12.png",
  },
  {
    id: 13,
    name: "Muffin Spencer",
    email: "muffin.spencer@domain.com",
    avatar: "http://localhost:5000/images/13.png",
  },
];
