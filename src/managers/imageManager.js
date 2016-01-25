import crypto from 'crypto'
import fs from 'fs'

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

export function saveImage (imagePath, imageStream) {
  var writableStream = fs.createWriteStream(imagePath)

  return new Promise((resolve, reject) => {
    writableStream.on('error', function (err) {
      reject(err)
    })

    imageStream.on('data', function (chunk) {
      writableStream.write(chunk)
    })

    imageStream.on('end', function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(imagePath)
      }
    })
  })
}

export function deleteImage (image) {
  return new Promise((resolve, reject) => {
    fs.unlink(image.url, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(image)
      }
    })
  })
}
