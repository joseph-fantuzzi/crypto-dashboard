const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");
const generateToken = require("./token");

router.get("/", (req, res, next) => {
  Users.getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (!user) {
        next({ status: 404, message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => next(err));
});

router.post("/register", (req, res, next) => {
  const { first_name, last_name, email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    first_name,
    last_name,
    email,
    username,
    password: hashedPassword,
  };
  Users.insert(newUser)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  Users.getBy({ username })
    .then((user) => {
      if (!user) {
        next({ status: 404, message: "User not found" });
      } else {
        const success = bcrypt.compareSync(password, user.password);
        if (success) {
          res.json({
            message: `Welcome back, ${user.username}`,
            token: generateToken(user),
            user: {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              username: user.username,
            },
          });
        } else {
          next({ status: 401, message: "Invalid credentials" });
        }
      }
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.remove(id)
    .then((removedUser) => {
      if (!removedUser) {
        next({ status: 404, message: "User not found" });
      } else {
        res.json(removedUser);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
