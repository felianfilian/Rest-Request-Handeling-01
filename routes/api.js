const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// GET Data
router.get('/ninjas', function (req, res, next) {
  Ninja.aggregate()
    .near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: 'dis',
    })
    .then(function (ninjas) {
      res.send(ninjas);
    });
});
// POST Data
router.post('/ninjas', function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});
// UPDATE Data
router.put('/ninjas/:id', function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja);
    });
  });
});
// DELETE Data
router.delete('/ninjas/:id', function (req, res, next) {
  Ninja.findByIdAndDelete({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja);
  });
});

module.exports = router;
