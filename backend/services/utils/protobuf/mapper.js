import lodash from "lodash";

import { TYPES } from "./decoder.js";

const { isString } = lodash;

/**
 * Expected schema format:
 * {
 *   <field_num>: {
 *     name: "<field_name>",
 *     subType: "Int|Unsigned Int|Signed Int|Float|Double|String" or a nested schema
 *                (can wrap the type in array to indicate an array)
 *   }
 * }
 */

function mapProtoToSchema(proto, schema, skipUndefined = true) {
  const obj = {};
  for (let { index, type, value, asStringValue } of proto.parts) {
    const schemaOfIndex = schema[index];
    if (schemaOfIndex === undefined) {
      if (skipUndefined) {
        continue;
      }
      throw new Error(`Cannot find field ${index}`);
    }

    let { name, subType } = schemaOfIndex;

    const isArray = Array.isArray(subType);
    if (isArray) {
      subType = subType[0];
    }

    let normalizedValue;
    if (type === TYPES.STRING) {
      if (subType === "String") {
        normalizedValue = asStringValue || value;
      } else {
        normalizedValue = mapProtoToSchema(value, subType);
      }
    } else {
      normalizedValue = parseFloat(value.filter(({ type }) => type === subType)[0].value);
    }

    if (isArray) {
      if (obj[name] === undefined) {
        obj[name] = [];
      }
      obj[name].push(normalizedValue);
    } else {
      obj[name] = normalizedValue;
    }
  }
  return obj;
}

export { mapProtoToSchema };
export default {
  mapProtoToSchema,
};
