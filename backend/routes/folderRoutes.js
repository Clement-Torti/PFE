const express = require('express')
const router = express.Router()
const Logger = require('../lib/logger')

const Folder = require('../database/models/folder')

router.get('/folders', (req, res) => {
  Folder.find({})
    .then(folders => res.send(folders))
    .catch((error) => Logger.http(error))
})

router.post('/folders', (req, res) => {
  (new Folder({ title: req.body.title }))
    .save()
    .then((folder) => res.send(folder))
    .catch((error) => Logger.http(error))
})

router.get('/folders/:folderId', (req, res) => {
  Folder.find({ _id: req.params.folderId })
    .then((folder) => res.send(folder))
    .catch((error) => Logger.http(error))
})

router.delete('/folders/:folderId', (req, res) => {
  const deleteFiles = (folder) => {
    File.deleteMany({ _folderId: folder._id })
      .then(() => folder)
      .catch((error) => Logger.http(error))
  }
  Folder.findByIdAndDelete(req.params.folderId)
    .then((folder) => res.send(deleteFiles(folder)))
    .catch((error) => Logger.http(error))
})

module.exports = router
