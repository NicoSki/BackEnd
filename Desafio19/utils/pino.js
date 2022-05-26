const pino = require("pino");
const logger = pino({
    prettyPrint: {
        translateTime: "dd-mm-yyyy hh:mm",
        ignore: "pid,hostname"
    }
});

module.exports = logger;

