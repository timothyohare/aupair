var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/aupairs', function(req, res) {
  res.render('aupairs', { title: 'You wish to be an Au pair' });
});

// au-pair register
router.get('/aupairs/register', function(req, res) {
  res.render('aupair-register', { title: 'Au pair account setup' });
});

// au-pairs searching for a family
router.get('/aupairs/search', function(req, res) {
  res.render('family-search', { title: 'Search for your family' });
});

// recevies the form post
router.post('/test-page', function(req, res) {
  console.log(req.body.firstname);

  // validate


  // save to database

  // got to success page

});

// testing
// http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
// https://brianstoner.com/blog/testing-in-nodejs-with-mocha/

module.exports = router;
