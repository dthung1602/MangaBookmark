import { check } from "express-validator";

import { ErrorFormatter } from "./mixins";

export default [check("authProvider").exists().isIn(["register", "login", "link"]), ErrorFormatter];
