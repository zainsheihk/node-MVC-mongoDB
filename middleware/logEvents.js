const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { promises: fsPromises } = require("fs");

const path = require("path");

const logEvent = async (message, logName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `\n${dateTime}\t${uuid()}\t${message}`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Log event complete");
  }
};

const logger = (req, res, next) => {
  console.log(req.headers.origin, req.method);
  logEvent(
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "requestsLog.txt"
  );
  next();
};
module.exports = { logEvent, logger };
