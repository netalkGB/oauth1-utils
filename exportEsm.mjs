import module from "module";
const require = module.createRequire(import.meta.url);

export const { OAuth1Utils } = require("./index.js");
