import createLocal from "./create-local.js";
import createFromThirdParty from "./create-from-third-party.js";
import unlink from "./unlink.js";
import link from "./link.js";
import patch from "./patch.js";
import changePassword from "./change-password.js";
import delete_ from "./delete.js";

export { createLocal, createFromThirdParty, unlink, link, patch, changePassword, delete_ as delete };

export default {
  createLocal,
  createFromThirdParty,
  unlink,
  link,
  patch,
  changePassword,
  delete: delete_,
};
