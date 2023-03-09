const crypto = require("crypto");

exports.generateHashFromStr = (str) =>
  crypto.createHash("sha3-512").update(str).digest("hex");
