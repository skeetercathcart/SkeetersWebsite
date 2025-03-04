const express = require('express')
const osrsController = require('../../controllers/OsrsData')
const router = express.Router()
const path = require('path')

router.post('/addWeapon', osrsController.createOsrsWeapon)

module.exports = router