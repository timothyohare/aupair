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
router.post('/aupairs/register', function(req, res) {
  console.log(req.body.firstname);
  var getUsersInfo = new users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    getUsersInfo.save(function(err, userinfo) {
        if(!err) {
            req.session.user = userInfo;
            res.redirect('/aupairs/ + userInfo.id');
        }
        else {
            // Send error
        }
    });

});

app.get('/aupairs/:userId', function(req, res) {
    var user_id = req.param('userId');
    users.findById(user_id, function(err, user) {
        // user is available here. Add it to the template context and render it.
    });
});

// testing
// http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
// https://brianstoner.com/blog/testing-in-nodejs-with-mocha/

module.exports = router;
