const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3
  }
})

const Folder = mongoose.model('Folder', FolderSchema)

module.exports = Folder
