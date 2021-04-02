const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// const manipulated = require('./api/cryptoRoutes')
const fetch = require("node-fetch");
require("dotenv").config();
const fs = require('fs');

router.get('/', withAuth, async (req, res) => {
  // res.render('homepage');
  var arr = [];

      fetch("https://coinpaprika1.p.rapidapi.com/coins/", //ranked coins
          {
              "headers": {
                  "x-rapidapi-key": process.env.CP_API_KEY,
                  "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
              }
          }).then(res => res.json())
              .then(data => { // all coin metadata returned (in order)
                  for(i=0; i<2; i++){ // only want to display some
                      fetch("https://coinpaprika1.p.rapidapi.com/coins/" + data[i].id, // grabs one coin id from metadata
                      {
                          "headers": {
                          "x-rapidapi-key": process.env.CP_API_KEY,
                          "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
                          }
                      }).then(res => res.json()) 
                          .then(data => { // 1 coin metadata by id
                              var sym = (data.symbol); // 1 symbol saved into sym since dot notation was confusing .push
                              arr.push(sym), // push 1 symbol into array
                              fs.writeFile('arr.json', arr.join(','), 'utf-8', function (err) {
                                  if (err) return console.log(err);
                                  console.log('works');
                                  getArray()
                                  }
                              ) 
                          })
  
                  };
              })
  const getArray = () => {
      fs.readFile("arr.json", 'utf-8',function(err, data) {
          if (err) throw err;     
          const arr = data;
          console.log("array from arr.json", arr); 
          fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + arr + "&tsyms=USD&api_key=" + process.env.CC_API_KEY) // full data for several coins
          .then(response => response.json())
          .then(data => {
              const display = data.DISPLAY; // api res for display
              const manipulated = Object.entries(display).reduce((acc,el) => { // this fn turns api res into arr of objects
                  Object.entries(el[1]).forEach((display) => {
                      display[1].SYM = el[0]
                      acc.push(display[1])
                  })
                  return acc;
              },[]) 
              res.render('homepage', {manipulated})
              }
          )
          });
      };
  });

// router.get('/post', async (req, res) => {
//   res.render('post');
// });
router.get('/post', async (req, res) => {
  let postData = await Post.findAll({
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render('post', { posts, logged_in: req.session.logged_in});
});


router.get('/dashboard', withAuth, async (req, res) => {
  const commentData = await Post.findAll({
    include: [
      {
        model: Comment,
        attributes: ['comment', 'user_id', 'post_id'],
      },
    ]
  });

  const postData = await Post.findAll({
    // sort: [Post.date_created, 'DESC'],
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['comment', 'user_id', 'post_id'],
      },
    ]
  }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  const comments = commentData.map((comment) => comment.get({ plain: true}));
  console.log(posts);
  res.render('dashboard', { posts, logged_in: req.session.logged_in, comments});
});

router.get('/signup', async (req, res) => {
  res.render('signup', {
    title: "Sign Up"
  })
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login', {
    title: "Login"
  });

});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
  // res.render('logout');
});

// router.get('/coinBar', async (req, res) => {
//   res.render('coinBar', { json });
// });

module.exports = router;