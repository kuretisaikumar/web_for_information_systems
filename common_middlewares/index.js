const jwt = require('jsonwebtoken');

const requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.jwt_secret);
        req.user = user;
    } else {
        res.status(400).json({ msg: `Authorization required` });
    }
    next();
}

const clientMiddleware = (req, res, next) => {
    if (req.user.role !== 'client') {
        res.status(400).json({
            msg: 'User access denide'
        })
    }
    next();
}

const dealerMiddleware = (req, res, next) => {
    if (req.user.role !== 'dealer') {
        res.status(400).json({
            msg: 'Dealer access denide'
        })
    }
    next();
}

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(400).json({
            msg: 'Dealer access denide'
        })
    }
    next();
}
const dealerOrAdminMiddleware = (req, res, next) => {
    if (req.user.role === 'dealer' || req.user.role === 'admin') {
        next();
    }else{
        res.status(400).json({
            msg: 'Access Denied'
        })
    }
}

const clientOrAdminMiddleware = (req, res, next) => {
    if (req.user.role === 'client' || req.user.role === 'admin') {
        next();
    }else{
        res.status(400).json({
            msg: 'Access Denied'
        })
    }
}
module.exports = {
    requireSignIn,
    clientMiddleware,
    dealerMiddleware,
    dealerOrAdminMiddleware,
    adminMiddleware,
    clientOrAdminMiddleware
}