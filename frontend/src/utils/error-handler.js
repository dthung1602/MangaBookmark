import { message } from "antd";

const statusMapping = new Map([
  [500, "Internal server error. Try again later."],
  [401, "Unauthenticated. Please login and try again."],
  [403, "Forbidden. You don't have permission to perform this action."],
  [404, "Not found."],
]);

export const checkResponse = (response, ignoreStatuses = []) => {
  // Throw exception when response is not ok
  if (ignoreStatuses.indexOf(response.status) === -1) {
    const msg = statusMapping.get(response.status);
    if (msg) {
      throw new Error(msg);
    }
  }
};

export const notifyError = (error) => {
  message.error(error.message);
};

export const formatErrors = (errors) => {
  // Map backend error format to antd Form FieldData
  return Object.entries(errors).map(([name, { msg, value }]) => ({
    value,
    name,
    touched: true,
    validating: false,
    errors: [msg],
  }));
};
