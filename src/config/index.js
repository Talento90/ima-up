const env = process.env.mode || 'dev';
var configFile = `config.${env}.json`;

export default {
    configFile
};