var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('aupairs', { title: 'You wish to be an Au-pair' });
});

// au-pair register
router.get('/register', function(req, res) {
  res.render('aupair-regsiter', { title: 'Au-pair account setup' });
});

// au-pairs searching for a family
router.get('/search', function(req, res) {
  res.render('family-search', { title: 'Search for your family' });
});

module.exports = router;
