'use strict'

const env = process.env.NODE_ENV || 'dev'
const configFile = `config.${env}.js`
const configs = require('./' + configFile)

export function get () {
  return configs.getConfiguration()
}
