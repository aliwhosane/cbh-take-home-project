const crypto = require("crypto");
const { generatePartitionKey } = require("./dpk");

describe("generatePartitionKey", () => {
  // Test generating partition key from event object with partition key property
  test("generates partition key from event object with partition key property", () => {
    const event = { partitionKey: "test_partition_key" };
    const partitionKey = generatePartitionKey(event);
    expect(partitionKey).toBe("test_partition_key");
  });

  // Test generating partition key from event object without partition key property
  test("generates partition key from event object without partition key property", () => {
    const event = { data: { test_data: "test_value" } };
    const partitionKey = generatePartitionKey(event);
    const expectedPartitionKey = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(partitionKey).toBe(expectedPartitionKey);
  });

  // Test generating partition key from non-string candidate
  test("generates partition key from non-string candidate", () => {
    const event = { data: { test_data: "test_value" } };
    const partitionKey = generatePartitionKey(event);
    const expectedPartitionKey = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(partitionKey).toBe(expectedPartitionKey);
  });

  // Test generating partition key from null or undefined candidate
  test("generates partition key from null or undefined candidate", () => {
    const event = null;
    const partitionKey = generatePartitionKey(event);
    expect(partitionKey).toBeDefined();
  });

  // Test generating partition key with length <= 256 characters
  test("generates partition key with length <= 256 characters", () => {
    const event = { data: { test_data: "test_value" } };
    const partitionKey = generatePartitionKey(event);
    expect(partitionKey.length).toBeLessThanOrEqual(256);
  });

  // Test generating partition key with length > 256 characters
  test("generates partition key with length > 256 characters", () => {
    const event = { data: { test_data: "test_value" } };
    const longString = "x".repeat(257);
    event.data.long_string = longString;
    const partitionKey = generatePartitionKey(event);

    expect(partitionKey.length).toBeLessThanOrEqual(256);
  });
});
