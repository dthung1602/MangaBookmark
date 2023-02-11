import * as expressValidator from "express-validator";
import { ErrorFormatter } from "./mixins/index.js";

const { query } = expressValidator;

export default [query("action").exists().isIn(["register", "login", "link"]), ErrorFormatter];
