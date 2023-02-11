import JSBI from "jsbi";
const BIGINT_1 = JSBI.BigInt(1);
const BIGINT_2 = JSBI.BigInt(2);

function interpretAsSignedType(n) {
  // see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/wire_format_lite.h#L857-L876
  // however, this is a simpler equivalent formula
  const isEven = JSBI.equal(JSBI.bitwiseAnd(n, JSBI.BigInt(1)), JSBI.BigInt(0));
  if (isEven) {
    return JSBI.divide(n, BIGINT_2);
  } else {
    return JSBI.multiply(JSBI.BigInt(-1), JSBI.divide(JSBI.add(n, BIGINT_1), BIGINT_2));
  }
}

function bufferLeToBeHex(buffer) {
  let output = "";
  for (const v of buffer) {
    const hex = v.toString(16);
    if (hex.length === 1) {
      output = "0" + hex + output;
    } else {
      output = hex + output;
    }
  }
  return output;
}

function decodeFixed32(value) {
  const floatValue = value.readFloatLE(0);
  const intValue = value.readInt32LE(0);
  const uintValue = value.readUInt32LE(0);

  const result = [];

  result.push({ type: "Int", value: intValue });

  if (intValue !== uintValue) {
    result.push({ type: "Unsigned Int", value: uintValue });
  }

  result.push({ type: "Float", value: floatValue });

  return result;
}

function decodeFixed64(value) {
  const floatValue = value.readDoubleLE(0);
  const uintValue = JSBI.BigInt("0x" + bufferLeToBeHex(value));
  const intValue = twoComplements(uintValue);

  const result = [];

  result.push({ type: "Int", value: intValue.toString() });

  if (intValue !== uintValue) {
    result.push({ type: "Unsigned Int", value: uintValue.toString() });
  }

  result.push({ type: "Double", value: floatValue });

  return result;
}

function decodeVarintParts(value) {
  const result = [];
  const intVal = JSBI.BigInt(value);
  result.push({ type: "Int", value: intVal.toString() });

  const signedIntVal = interpretAsSignedType(intVal);
  if (signedIntVal !== intVal) {
    result.push({ type: "Signed Int", value: signedIntVal.toString() });
  }
  return result;
}

const maxLong = JSBI.BigInt("0x7fffffffffffffff");
const longForComplement = JSBI.BigInt("0x10000000000000000");

function twoComplements(uintValue) {
  if (JSBI.greaterThan(uintValue, maxLong)) {
    return JSBI.subtract(uintValue, longForComplement);
  } else {
    return uintValue;
  }
}

export { decodeFixed32, decodeFixed64, decodeVarintParts };
export default {
  decodeFixed32,
  decodeFixed64,
  decodeVarintParts,
};
