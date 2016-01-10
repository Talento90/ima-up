import imageController from './imageController'
import indexController from './indexController'

export default function (server) {
  imageController(server)
  indexController(server)
}
