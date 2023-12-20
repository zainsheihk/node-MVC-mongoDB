const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents.js");
const { errorHandler } = require("./middleware/errorHandler.js");

var whitelist = ["https://www.google.com.pk"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/sub-dir", require("./routes/subdir.js"));
app.use("/api/employees", require("./routes/api/employee.js"));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(302, "/new-page.html");
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
