const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
    firstName: String,
    userName: String,
    password: String
});

const User = mongoose.model("User", SignupSchema);

function generatePassword(password) {
    const key = crypto.createCipher('aes-128-cbc', 'abc');// abc replace by some data
    let newPassword = key.update(password, 'utf8', 'hex');
    newPassword += key.final('hex');
    return newPassword;

}
// Home page route.
router.post('/', function (req, res) {
    if (req.body.firstName === null && req.body.firstName === '') {
        return res.status(400).json({ message: 'Please enter First Name'})
    }
    if (req.body.userName === null && req.body.userName === 'Please enter User Name') {
        return res.status(400).json({ message: ''})
    }
    if (req.body.password === null && req.body.password === 'Please enter Password') {
        return res.status(400).json({ message: ''})
    }
    User.findOne({ userName: req.body.userName}).then(result => {
        if (result === null) {
            req.body.password = generatePassword(req.body.password);
            var myData = new User(req.body);
            myData.save()
                .then(item => {
                    return res.status(200).json({ message: 'User Registered Successfully!' });
                })
                .catch(err => {
                    return res.status(400).json({ message: 'User Not Registered' });
                });
        } else {
            return res.status(400).json({ message: 'User already exist!' });
        }

    })
        .catch(err => {
            return res.status(400).json({ message: 'unable to save to database' });
        });
})

// About page route.
router.post('/login', function (req, res) {
    if (req.body.userName === null && req.body.userName === 'Please enter User Name') {
        return res.status(400).json({ message: ''})
    }
    if (req.body.password === null && req.body.password === 'Please enter Password') {
        return res.status(400).json({ message: ''})
    }
    User.findOne({ userName: req.body.userName}).then(result => {
        if (result === null) {
            return res.status(400).json({ message: 'User does not exist!' });
        }
        const newPassword = generatePassword(req.body.password);

        if (result.password === newPassword) {
            return res.status(200).json({ data: result, message: 'Login Successful'});
        } else {
            return res.status(400).json({ message: 'Password does not match' });
        }
    })
        .catch(err => {
            return res.status(400).json({ message: 'unable to save to database' });
        });
})

module.exports = router;
