import BaseAPI from "./base.api";
import { clonePlainObject } from "../utils";

class UserAPI extends BaseAPI {
  constructor() {
    super("user");
  }

  create(params) {
    params = clonePlainObject(params);
    return this.post(params);
  }

  changePassword(params) {
    params = clonePlainObject(params);
    return this.patch(params, "change-password");
  }

  login(params) {
    params = clonePlainObject(params);
    return this.post(params, "login");
  }

  logout() {
    return this.post(undefined, "logout");
  }

  unlink(provider) {
    return this.delete(provider);
  }
}

export default new UserAPI();
