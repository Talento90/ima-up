import * as Configs from '../configs'
import Image from '../models/image'
import fs from 'fs'

const config = Configs.get()
var imageMemRepository = []

export function getImageById (id) {
  return Promise.resolve(imageMemRepository.map((img) => img.id === id)[0])
}

export function getImageByHash (imgHash) {
  return Promise.resolve(imageMemRepository.map((img) => img.hash === imgHash)[0])
}

export function saveImage (type, hash, imageStream) {
  let image = new Image(type, hash)
  var imagePath = config.server.imagesStorage + image.id + config.imageMapping[type]
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
        image.url = imagePath
        imageMemRepository.push(image)
        resolve(image)
      }
    })
  })
}
