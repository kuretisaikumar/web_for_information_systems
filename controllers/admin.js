const User = require('../models/user');
const Venue = require('../models/venue');
const Deal = require('../models/deal');

// User management
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.changeUserRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Venue management
exports.getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.send(venues);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.addVenue = async (req, res) => {
    try {
        const venue = new Venue(req.body);
        await venue.save();
        res.status(201).send(venue);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!venue) {
            return res.status(404).send({ error: 'Venue not found' });
        }
        res.send(venue);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) {
            return res.status(404).send({ error: 'Venue not found' });
        }
        res.send({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Deal management
exports.getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find().populate({ path: 'userId',select: 'firstName lastName'}).populate({
            path: 'venueOwnerId',
            select: 'firstName lastName'
        });
        res.send(deals);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateDeal = async (req, res) => {
    try {
        const booking = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }
        res.send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};
