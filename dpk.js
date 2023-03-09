const { generateHashFromStr } = require("./generateHashFromStr");

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return generateHashFromStr(JSON.stringify(event));
  }

  if (typeof event.partitionKey === "string") {
    return event.partitionKey;
  }

  const jsonPartitonKey = JSON.stringify(event.partitionKey);
  if (jsonPartitonKey.length > MAX_PARTITION_KEY_LENGTH) {
    return generateHashFromStr(jsonPartitonKey);
  }

  return jsonPartitonKey;
};

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
