import config from "./config";

console.log(config);
const env = process.env.mode || 'dev';
var configFile = `config.${ env }.json`;

export default {
    configFile
};
//# sourceMappingURL=all.js.map
