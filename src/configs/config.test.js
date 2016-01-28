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
      }
    ]
  },
  'database': {
    'connectionString': 'mongodb://localhost/ima-up-test'
  }
}

export function getConfiguration () {
  return configs
}
