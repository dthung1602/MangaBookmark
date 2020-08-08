import BaseAPI from "./base.api";

class UserAPI extends BaseAPI {
  constructor() {
    super("user");
  }

  create(params) {
    return this.post(params);
  }
}

export default new UserAPI();
