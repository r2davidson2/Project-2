//  Dependencies
// ===============
const express = require('express');
const router = express.Router();
const Cars = require('../models/cars.js');

// ===============
//     Routes
// ===============
// New Route
router.get('/new', (req, res) => {
   res.render('new.ejs');
});

// Index Route
router.get('/', (req, res) => {
   Cars.find({}, (error, allCars) => {
      res.render('index.ejs', {
         cars: allCars
      });
   });
   // res.render('index.ejs')
});

//Destroy/Delete Route
router.delete('/:id', (req, res) => {
   Cars.findByIdAndRemove(req.params.id, (error, foundCar) => {
      res.redirect('/');
   });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
   Cars.findById(req.params.id, (error, foundCar) => {
      res.render('edit.ejs', {
         cars:foundCar
      });
   });
});

// Update Route
router.put('/:id', (req, res) => {
   Cars.findById(req.params.id, (error, foundCar) => {
      res.render('edit.js'), {
         cars: foundCar
      }
   });
});

// Show Route
router.get('/:id', (req, res) => {
   Cars.findById(req.params.id, (error, foundCar) => {
      res.render('show.ejs', {
         cars: foundCar
      });
   });
});

// Create Route
router.post('/', (req, res) => {
   Cars.create(req.body, (error, createdCar) => {
      res.redirect('/');
   });
});



module.exports = router;
