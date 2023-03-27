const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

export default deterministicPartitionKey = (event) => {
  let candidate;

  // Check if partionKey property exists for given event object
  if (event?.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  // Stringify candidate if not a string
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  // Set default value of "0" in case candidate isn't defined yet
  if (!candidate) {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  // If candidate length is greater than MAX_PARTITION_KEY_LENGTH
  // rehash it using sha3-512
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
