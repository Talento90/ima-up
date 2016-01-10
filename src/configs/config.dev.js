const configs = {
  'server': {
    port: 3000,
    maxBytes: 20971520 //   20MB
  },
  'logging': {
    'opsInterval': 1000,
    'reports': [
      {
        reporter: require('good-console'),
        events: { log: '*', response: '*' },
        config: {
          format: 'YYYY-MM-DD HH:mm:ss'
        }
      },
      {
        reporter: require('good-file'),
        events: { log: '*', response: '*', ops: '*' },
        config: {
          path: 'C:\\Users\\Marco\\Desktop\\Projects\\GitHub\\node-hapiness\\logs',
          format: 'YYYY-MM-DD',
          extension: '.log',
          prefix: 'ImaUp',
          rotate: 'daily'
        }
      }
    ]
  },
  'database': {

  }
}

export function getConfiguration () {
  return configs
}
