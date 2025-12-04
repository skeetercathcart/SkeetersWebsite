const express = require('express')
const homeDepotController = require('../../controllers/HomeDepot')
const router = express.Router()
const path = require('path')

router.get('/getPaginatedDesigns', homeDepotController.getPaginatedDesigns)
router.get('/getAllStickerDesigns', homeDepotController.getAllStickerDesigns)

router.post('/addDesign', homeDepotController.createSavedDesign)

module.exports = router