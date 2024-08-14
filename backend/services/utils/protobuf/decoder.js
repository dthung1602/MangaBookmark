import JSBI from "jsbi";
import { decodeFixed32, decodeFixed64, decodeVarintParts } from "./part-decoder.js";
const BIGINT_2 = JSBI.BigInt(2);

function decodeVarint(buffer, offset) {
  let res = JSBI.BigInt(0);
  let shift = 0;
  let byte = 0;

  do {
    if (offset >= buffer.length) {
      throw new RangeError("Index out of bound decoding varint");
    }

    byte = buffer[offset++];

    const multiplier = JSBI.exponentiate(BIGINT_2, JSBI.BigInt(shift));
    const thisByteValue = JSBI.multiply(JSBI.BigInt(byte & 0x7f), multiplier);
    shift += 7;
    res = JSBI.add(res, thisByteValue);
  } while (byte >= 0x80);

  return {
    value: res,
    length: shift / 7,
  };
}

class BufferReader {
  constructor(buffer) {
    this.buffer = buffer;
    this.offset = 0;
  }

  readVarInt() {
    const result = decodeVarint(this.buffer, this.offset);
    this.offset += result.length;

    return result.value;
  }

  readBuffer(length) {
    this.checkByte(length);
    const result = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;

    return result;
  }

  // gRPC has some additional header - remove it
  trySkipGrpcHeader() {
    const backupOffset = this.offset;

    if (this.buffer[this.offset] === 0) {
      this.offset++;
      const length = this.buffer.readInt32BE(this.offset);
      this.offset += 4;

      if (length > this.leftBytes()) {
        // Something is wrong, revert
        this.offset = backupOffset;
      }
    }
  }

  leftBytes() {
    return this.buffer.length - this.offset;
  }

  checkByte(length) {
    const bytesAvailable = this.leftBytes();
    if (length > bytesAvailable) {
      throw new Error("Not enough bytes left. Requested: " + length + " left: " + bytesAvailable);
    }
  }

  checkpoint() {
    this.savedOffset = this.offset;
  }

  resetToCheckpoint() {
    this.offset = this.savedOffset;
  }
}

const TYPES = {
  VARINT: 0,
  FIXED64: 1,
  STRING: 2,
  FIXED32: 5,
};

function decodeProto(buffer) {
  const reader = new BufferReader(buffer);
  const parts = [];

  reader.trySkipGrpcHeader();

  try {
    while (reader.leftBytes() > 0) {
      reader.checkpoint();

      const indexType = parseInt(reader.readVarInt().toString());
      const type = indexType & 0b111;
      const index = indexType >> 3;

      let value;
      let asStringValue;
      if (type === TYPES.VARINT) {
        value = decodeVarintParts(reader.readVarInt().toString());
      } else if (type === TYPES.STRING) {
        const length = parseInt(reader.readVarInt().toString());
        const buffer = reader.readBuffer(length);
        const nestedValue = decodeProto(buffer);
        if (length > 0 && nestedValue.leftOver.length === 0) {
          value = nestedValue;
          asStringValue = buffer.toString();
        } else {
          value = buffer.toString();
        }
      } else if (type === TYPES.FIXED32) {
        value = decodeFixed32(reader.readBuffer(4));
      } else if (type === TYPES.FIXED64) {
        value = decodeFixed64(reader.readBuffer(8));
      } else {
        throw new Error("Unknown type: " + type);
      }

      parts.push({
        index,
        type,
        value,
        asStringValue,
      });
    }
  } catch (err) {
    reader.resetToCheckpoint();
  }

  return {
    parts,
    leftOver: reader.readBuffer(reader.leftBytes()),
  };
}

function typeToString(type) {
  switch (type) {
    case TYPES.VARINT:
      return "varint";
    case TYPES.STRING:
      return "string";
    case TYPES.FIXED32:
      return "fixed32";
    case TYPES.FIXED64:
      return "fixed64";
    default:
      return "unknown";
  }
}

export { TYPES, decodeProto, typeToString };
export default {
  TYPES,
  decodeProto,
  typeToString,
};
