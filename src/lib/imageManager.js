import crypto from 'crypto'

export function generateImageHash (stream) {
  return new Promise((resolve, reject) => {
    let hash = crypto.createHash('md5')

    stream.on('data', (data) => {
      hash.update(data, 'utf8')
    })

    stream.on('error', (err) => {
      reject(err)
    })

    stream.on('end', () => {
      resolve(hash.digest('hex'))
    })
  })
}
