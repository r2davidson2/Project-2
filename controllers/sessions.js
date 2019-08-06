const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
const Cars = require('../models/cars.js');

// New Session/Login
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

// Sessions Form Submit
sessions.post('/', (req, res) => {
   User.findOne({ username: req.body.username}, (err, foundUser) => {
     // Database error
     if(err) {
        console.log(err)
        res.send('oops something went wrong')
      } else if (!foundUser) {
         res.send('<a href="/">Sorry, no user found!</a>')
      } else {
         // check if passwords match
         if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            // add the user to our session
            req.session.currentUser = foundUser
            // redirect back to our home page
            res.redirect('/cars')
         } else {
            res.send('<a href="/">wrong password</a>')
         }
      }
   })
})

sessions.delete('/', (req, res) => {
   req.session.destroy(() => {
      res.redirect('/');
   });
});

module.exports = sessions
