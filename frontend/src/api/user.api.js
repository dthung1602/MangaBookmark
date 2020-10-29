import BaseAPI from "./base.api";

class UserAPI extends BaseAPI {
  constructor() {
    super("user");
  }

  create(params) {
    return this.post(params);
  }

  changePassword(params) {
    return this.patch(params, "change-password");
  }

  login(params) {
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
