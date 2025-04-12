const express = require('express')
const osrsController = require('../../controllers/OsrsData')
const router = express.Router()
const path = require('path')


router.get('/getWeapon', osrsController.getOsrsWeapon)
router.get('/getWeapon/:id', osrsController.getOsrsWeaponById)
router.get('/getWeaponNames', osrsController.getOsrsWeaponNames)
router.get('/getPaginatedItems', osrsController.getPaginatedOsrsItems)
router.get('/getAllOsrsItems', osrsController.getAllOsrsItems)
router.get('/getOsrsGear/:id', osrsController.getOsrsGearById)
router.get('/getAllOsrsMonsters', osrsController.getAllOsrsMonsters)

router.post('/getPaginatedOsrsCollection', osrsController.getPaginatedOsrsCollection)
router.post('/addWeapon', osrsController.createOsrsWeapon)
router.post('/addGear', osrsController.createOsrsGear)
router.post('/addMonster', osrsController.createOsrsMonster)

router.put('/updateOsrsItemName/:id', osrsController.updateOsrsItemName)

router.delete('/delOsrsItem/:id', osrsController.deleteOsrsItem)


module.exports = router