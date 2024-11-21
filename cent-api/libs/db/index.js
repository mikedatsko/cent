const firebase = require("./drivers/firebase");

module.exports = (driverName) => {
  switch (driverName) {
    case "firebase":
      return firebase;

    default:
      return;
  }
};
