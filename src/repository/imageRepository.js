//  import * as Configs from '../configs'
import Image from '../models/image'
// import fs from 'fs'

// const config = Configs.get()
var imageMemRepository = []

export function getImageById (id) {
  return Promise.resolve(imageMemRepository.map((img) => img.id === id)[0])
}

export function getImageByHash (imgHash) {
  return Promise.resolve(imageMemRepository.map((img) => img.hash === imgHash)[0])
}

export function saveImage (type, hash, imageStream) {
  let image = new Image(type, hash)
//   var imagePath = config.server.imagesStorage + image.id + '.png'
//   var writableStream = fs.createWriteStream(imagePath)

//   writableStream.on('error', (err) => {
//     console.log(err)
//     return Promise.reject(err)
//   })

//   imageStream.pipe(writableStream)

//   imageStream.on('end', (err) => {
//     if (err) {
//       return Promise.resolve(err)
//     } else {
//       image.url = imagePath
//       console.log(image)
//       imageMemRepository.push(image)
//       return Promise.resolve(image)
//     }
//   })

  imageMemRepository.push(image)
  return Promise.resolve(image)
}
