const configs = {
  'imageMapping': {
    'image/png': '.png',
    'image/jpg': '.jpg',
    'image/jpeg': '.jpg'
  },
  'server': {
    port: 3001,
    maxBytes: 20971520, //   20MB
    imagesStorage: 'C:\\Uploads\\'
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
          path: 'C:\\Logs',
          format: 'YYYY-MM-DD',
          extension: '.log',
          prefix: 'ImaUp',
          rotate: 'daily'
        }
      }
    ]
  },
  'database': {
    'connectionString': 'mongodb://localhost/ima-up-dev'
  }
}

export function getConfiguration () {
  return configs
}
