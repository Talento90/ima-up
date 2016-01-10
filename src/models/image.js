'use strict'
import uuid from 'node-uuid'

export default class Image {
  constructor (contentType, hash, url) {
    this.id = uuid.v4()
    this.contentType = contentType
    this.hash = hash
    this.url = url
  }
}
