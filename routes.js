const express = require('express');
const router = express.Router();

// Home page route.
router.post('/', function (req, res) {
    res.send('Wiki home page');
})

// About page route.
router.get('/about', function (req, res) {
    res.send('About this wiki');
})


module.exports = router;
