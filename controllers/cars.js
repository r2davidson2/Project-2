//  Dependencies
// ===============
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Cars = require('../models/cars.js');
const User = require('../models/users.js');

// ===============
//     Routes
// ===============
// New Route
router.get('/new', (req, res) => {
   if (req.session.currentUser) {
      res.render('cars/new.ejs');
   } else {
      res.redirect('/sessions/new');
   }
});

// Index Route
router.get('/', (req, res) => {
   if (req.session.currentUser) {
      Cars.find({}, (error, allCars) => {
         res.render('cars/index.ejs', {
            cars: allCars
         });
      });
   } else {
      res.redirect('/sessions/new');
   }
   // res.render('index.ejs')
});

//Destroy/Delete Route
router.delete('/:id', (req, res) => {
   Cars.findByIdAndRemove(req.params.id, (error, foundCar) => {
      res.redirect('/cars');
   });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
   Cars.findById(req.params.id, (error, foundCar) => {
      res.render('cars/edit.ejs', {
         cars:foundCar
      });
   });
});

// Update Route
router.put('/:id', (req, res) => {
   Cars.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, foundCar) => {
      res.redirect('/cars/'+req.params.id)
   });
});

// Show Route
router.get('/:id', (req, res) => {
   Cars.findById(req.params.id, (error, foundCar) => {
      res.render('cars/show.ejs', {
         cars: foundCar
      });
   });
});

// Create Route
router.post('/', (req, res) => {
   Cars.create(req.body, (error, createdCar) => {
      res.redirect('/cars');
   });
});



module.exports = router;
