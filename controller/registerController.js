const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bycrypt = require("bcryptjs");

const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const duplicateUser = userDB.users.find(
    (user) => user.username === user.username
  );
  if (duplicateUser) {
    return res.status(409).json({ message: "Username already exists" });
  }
  try {
    const hash = await bycrypt.hash(password, 10);
    const newUser = { username, password: hash };
    userDB.users.push(newUser);
    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(userDB.users, null, 2)
    );
    res.status(201).json({ message: "User created" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { createNewUser };
