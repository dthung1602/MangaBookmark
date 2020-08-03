import BaseAPI from "./base.api";

class UserAPI extends BaseAPI {
  constructor() {
    super("user");
  }
}

export default new UserAPI();
