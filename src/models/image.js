'use strict'
import mongoose from 'mongoose'

var Schema = mongoose.Schema

var ImageSchema = new Schema({
  hash: { type: String, required: true, index: true },
  contentType: { type: String, required: true },
  url: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
})

export default mongoose.model('Image', ImageSchema)
