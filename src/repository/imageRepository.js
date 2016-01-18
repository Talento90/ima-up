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
  var imagePath = config.server.imagesStorage + image.id + '.png'
  var writableStream = fs.createWriteStream(imagePath)
  console.log(imagePath)

  return new Promise((resolve, reject) => {
    console.log(imageStream)
    console.log("xxx2")

    writableStream.on('error', function (err) {
      console.log(err)
      console.log('error')
      reject(err)
    })

    imageStream.pipe(writableStream)

    imageStream.on('end', function (err) {
      console.log(err)
      console.log('end')
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
