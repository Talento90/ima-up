import * as ImageRepository from '../repository/imageRepository'
import Image from '../models/image'
import bcrypt from 'bcrypt-nodejs'

export function saveImage (type, hash, imageData) {
  let image = new Image(type, hash, 'url')
  return ImageRepository.saveImage(image).then((image) => {
    return image
  })
}

export function getImageByHash (imgHash) {
  return ImageRepository.getImageByHash(imgHash).then((image) => {
    return image
  })
}

export function getImageById (id) {
  return ImageRepository.getImageById(id).then((image) => {
    return image
  })
}

export function generateImageHash (imageData) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(imageData, null, null, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

