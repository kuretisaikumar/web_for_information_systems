const express = require('express');
const { requireSignIn, dealerMiddleware, dealerOrAdminMiddleware } = require('../common_middlewares/index')
const { getAllVenues, createVenue, getVenueByVenueId, getAllVenuesByOwnerId, checkAvailability, deleteVenueById, updateVenue } = require('../controllers/venue');
const router = express.Router();
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '/public/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null,
            "image_" + new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/create-venue', requireSignIn, dealerOrAdminMiddleware, upload.array('venuePicture'), createVenue)
router.get('/venue/:venueId', getVenueByVenueId)
router.get('/venues/:ownerId', getAllVenuesByOwnerId)
router.get('/all-venues', getAllVenues);
router.get('/available', checkAvailability);
router.post('/venue-delete/:venueId',requireSignIn,deleteVenueById)
router.post('/venue-update/:venueId', requireSignIn, dealerOrAdminMiddleware,upload.array('venuePicture'), updateVenue )

module.exports = router;