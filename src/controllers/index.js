import imagesController from './imagesController'
import indexController from './indexController'

export default function (server) {
  imagesController(server)
  indexController(server)
}
