const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bycrypt = require("bcryptjs");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const foundUser = userDB.users.find(
    (user) => user.username === user.username
  );
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  try {
    const isMatch = await bycrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { handleLogin };
