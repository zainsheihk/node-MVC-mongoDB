const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents.js");
const { errorHandler } = require("./middleware/errorHandler.js");
const { corsOptions } = require("./config/corsOptions.js");

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/employees", require("./routes/api/employee.js"));
app.use("/api/register", require("./routes/api/register.js"));
app.use("/api/auth", require("./routes/api/auth.js"));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ message: "Not found" });
  } else if (req.accepts("text")) {
    res.status(404).type("txt").send("Not found");
  }
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
