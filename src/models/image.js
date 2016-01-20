'use strict'
import uuid from 'node-uuid'
import moment from 'moment'

export default class Image {
  constructor (contentType, hash) {
    this.id = uuid.v4()
    this.contentType = contentType
    this.hash = hash
    this.url = undefined
    this.created = moment.utc().format()
  }
}
