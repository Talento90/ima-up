var imageMemRepository = []

export function getImageById (id) {
  return Promise.resolve(imageMemRepository.map((img) => img.id === id))
}

export function getImageByHash (imgHash) {
  return Promise.resolve(imageMemRepository.map((img) => img.hash === imgHash))
}

export function saveImage (image) {
  imageMemRepository.push(image)
  return Promise.resolve(image)
}



