import fs from 'fs'

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
        resolve()
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
