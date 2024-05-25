import * as expressValidator from "express-validator";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

const ImageProxyValidator = [check("url").exists().isURL(), ErrorFormatter];

export default ImageProxyValidator;
