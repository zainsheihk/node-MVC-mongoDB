const { logEvent } = require("./logEvents.js");

const errorHandler = (err, req, res, next) => {
  logEvent(`${req.url}\t${req.headers.origin}\t${req.method}`, "errorLogs.txt");
  console.log(err.stack);
  res.status(500).send(err.message || "Internal Server Error  " + err.stack);
};
module.exports = { errorHandler };
