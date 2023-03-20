const express = require('express')
const router = express.Router()
const Logger = require('../lib/logger')
const File = require('../database/models/file')

router.get('/folders/:folderId/files', (req, res) => {
  File.find({ _folderId: req.params.folderId })
    .then((files) => res.send(files))
    .catch((error) => Logger.http(error))
})

router.post('/folders/:folderId/files', (req, res) => {
  (new File({ title: req.body.title, _folderId: req.params.folderId, content: req.body.content }))
    .save()
    .then((files) => res.send(files))
    .catch((error) => Logger.http(error))
})

router.get('/folders/:folderId/files/:fileId', (req, res) => {
  File.findOne({ _folderId: req.params.folderId, _id: req.params.fileId })
    .then((file) => res.send(file))
    .catch((error) => Logger.http(error))
})

router.patch('/folders/:folderId/files/:fileId', (req, res) => {
  File.updateOne({ _folderId: req.params.folderId, _id: req.params.fileId }, { $set: req.body })
    .then((file) => res.send(file))
    .catch((error) => Logger.http(error))
})

router.delete('/folders/:folderId/files/:fileId', (req, res) => {
  File.deleteOne({ _folderId: req.params.folderId, _id: req.params.fileId })
    .then((file) => res.send(file))
    .catch((error) => Logger.http(error))
})

module.exports = router
