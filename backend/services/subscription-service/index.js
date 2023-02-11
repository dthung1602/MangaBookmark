import delete_ from "./delete.js";
import list from "./list.js";
import create from "./create.js";

export { list, create, delete_ as delete };

export default {
  list,
  create,
  delete: delete_,
};
