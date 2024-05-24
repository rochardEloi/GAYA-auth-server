const express = require('express');
const bodyParser = require('body-parser');

const vcRoute = require("./routes/verification_codes");
const vaRoute = require("./routes/verification_assignments")

const { CreateOrUpdateVerificationCodes } = require('./models/verification_codes');

const app = express();
require('dotenv').config()



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.use("/verification_codes", vcRoute)
app.use("/verification_assignments", vaRoute)






module.exports = app;