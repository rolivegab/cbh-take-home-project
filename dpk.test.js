const { deterministicPartitionKey } = require("./dpk");
const { generateHashFromStr } = require("./generateHashFromStr");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns key the same as passed by partitionKey property", () => {
    const input = { partitionKey: "example" };
    const target = deterministicPartitionKey(input);
    expect(target).toBe(input.partitionKey);
  });
  it("Returns stringified object passed as partitionKey property", () => {
    const input = { partitionKey: { a: 10 } };
    const target = deterministicPartitionKey(input);
    expect(target).toBe(JSON.stringify(input.partitionKey));
  });
  it("Returns hash of stringified object passed as partitionKey property, if its higher than MAX_PARTITION_KEY_LENGTH", () => {
    const input = { partitionKey: new Array(500).fill(0) };
    const target = deterministicPartitionKey(input);

    expect(target).toBe(
      generateHashFromStr(JSON.stringify(input.partitionKey))
    );
  });
  it("Returns hash of object passed as input", () => {
    const input = new Array(500).fill(0);
    const target = deterministicPartitionKey(input);

    expect(target).toBe(generateHashFromStr(JSON.stringify(input)));
  });
});
