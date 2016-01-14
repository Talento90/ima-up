import * as ImageRepository from '../repository/imageRepository'
import crypto from 'crypto'

export function saveImage (type, hash, imageStream) {
  return ImageRepository.saveImage(type, hash, imageStream).then((image) => {
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
