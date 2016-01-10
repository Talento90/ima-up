const configs = {
  'server': {
    port: 3001,
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
      }
    ]
  },
  'database': {

  }
}

export function getConfiguration () {
  return configs
}
