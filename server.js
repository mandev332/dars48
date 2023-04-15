const fs = require("fs");
const ejs = require("ejs");
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();

let viewPath = (fileName) => {
  return path.join(__dirname, "public", "views", fileName + ".ejs");
};
app.use(cors("*"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
let a = 0;
app.get("/home", (req, res) =>
  res.render(viewPath("home"), {
    title: "Home",
    users: require("./data/users.json").slice(a++),
  })
);
app.get("/minus", (req, res) =>
  res.render(viewPath("home"), {
    title: "Home",
    users: require("./data/users.json").slice(a--),
  })
);

app.get("/login", (req, res) =>
  res.render(viewPath("login"), { title: "Login" })
);
app.get("/register", (req, res) =>
  res.render(viewPath("register"), { title: "Register" })
);

app.get("/users", (req, res) =>
  res.render(viewPath("users"), {
    title: "Users",
    users: require("./data/users.json"),
  })
);

app.get("/contacts", (req, res) =>
  res.render(viewPath("users"), {
    title: "Contacts",
    users: require("./data/users.json"),
  })
);

app.get("/user/:id", (req, res) =>
  res.render(viewPath("deteil"), {
    title: "User",
    user: require("./data/users.json").find((u) => u.id == req.params.id),
  })
);
app.get("/delete/:id", (req, res) => {
  let users = require("./data/users.json");
  users = users.filter((u) => u.id != req.params.id);
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4));
  res.render(viewPath("users"), { title: "Users", users });
});

app.post("/edit/:id", (req, res) => {
  let { username, lastname, email, phone } = req.body;
  let users = require("./data/users.json");
  users.find((u) => {
    if (u.id == req.params.id) {
      (u.username = username),
        (u.lastname = lastname),
        (u.email = email),
        (u.phone = phone);
    }
  });

  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4));
  res.render(viewPath("users"), { title: "Users", users });
});

app.post("/login", (req, res) => {
  let users = require("./data/users.json");
  let { username, email } = req.body;
  users.forEach((u) => {
    if (u.username == username && u.email == email) {
      res.send({ location: "users" });
    }
  });
});
app.post("/register", (req, res) => {
  try {
    let users = require("./data/users.json");
    req.body.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(req.body);
    fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4));

    res.send({ location: "users" });
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.listen(3000);
console.log("running");
