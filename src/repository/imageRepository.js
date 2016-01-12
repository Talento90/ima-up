var imageMemRepository = []

export function getImageById (id) {
  return Promise.resolve(imageMemRepository.map((img) => img.id === id)[0])
}

export function getImageByHash (imgHash) {
  return Promise.resolve(imageMemRepository.map((img) => img.hash === imgHash)[0])
}

export function saveImage (image) {
  imageMemRepository.push(image)
  return Promise.resolve(image)
}

