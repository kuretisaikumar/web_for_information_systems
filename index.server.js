const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// enviourment variables
env.config();

//middlewares
app.use(cors());
app.use(express.json());

// Routes
const dealerAuthRoutes = require('./routes/dealer.auth');
const clientAuthRoutes = require('./routes/client.auth');
const venueRoutes = require('./routes/venue');
const dealsRoutes = require('./routes/deal');
const adminRoutes = require('./routes/admin');
app.use(express.static(path.join(__dirname , "public") ));
app.use('/api', dealerAuthRoutes);
app.use('/api', clientAuthRoutes);
app.use('/api', venueRoutes);
app.use('/api', dealsRoutes);
app.use('/api/admin', adminRoutes);

// mongodb connection
const connectDB = (dburl) => {
    console.log("URL:: ",dburl);
    return mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }).then(() => {
        console.log('Database Connected');
    })
}

const start = async () => {
    try {
        await connectDB(process.env.dburl);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
