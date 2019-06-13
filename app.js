const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = 3000;

mongoose.Promise = require('bluebird');

// Connect to MongoDB
mongoose.connect("mongodb://localhost/nodeapp");
mongoose.connection.on('error', (err) => {
    log.error(`MongoDB connection error: ${err}`);
    process.exit(-1); // eslint-disable-line no-process-exit
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

var routes = require('./users.js');
app.use('/users', routes);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
