"use strict";

const env = process.env.mode || "dev";
const configFile = `config.${env}.js`;
const configs = require("./" + configFile);

export default {   
    configs
}