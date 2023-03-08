const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3
  },
  _folderId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    default: ''
  }
})

const File = mongoose.model('File', FileSchema)

module.exports = File
