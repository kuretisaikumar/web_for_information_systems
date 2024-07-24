const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');
const { requireSignIn, adminMiddleware } = require('../common_middlewares');

// User management
router.get('/users', requireSignIn, adminMiddleware, AdminController.getAllUsers);
router.put('/users/:id/role', requireSignIn, adminMiddleware, AdminController.changeUserRole);
router.delete('/users/:id', requireSignIn, adminMiddleware, AdminController.deleteUser);

// Venue management
router.get('/venues', requireSignIn, adminMiddleware, AdminController.getAllVenues);
router.post('/venues', requireSignIn, adminMiddleware, AdminController.addVenue);
router.put('/venues/:id', requireSignIn, adminMiddleware, AdminController.updateVenue);
router.delete('/venues/:id', requireSignIn, adminMiddleware, AdminController.deleteVenue);

// Deals management
router.get('/deals', requireSignIn, adminMiddleware, AdminController.getAllDeals);
router.put('/deals/:id', requireSignIn, adminMiddleware, AdminController.updateDeal);

module.exports = router;
