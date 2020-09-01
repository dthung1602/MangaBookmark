import BaseAPI from "./base.api";

class UserAPI extends BaseAPI {
  constructor() {
    super("user");
  }

  create(params) {
    return this.post(params);
  }

  changePassword(params) {
    return this.patch(params, "/change-password");
  }

  unlink(provider) {
    return this.patch({ provider }, "/unlink");
  }
}

export default new UserAPI();
