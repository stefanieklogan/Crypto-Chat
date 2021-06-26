const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
require("dotenv").config();
const fs = require('fs');

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
        attributes: ['comment', 'user_id', 'post_id','date_created'],
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
        attributes: ['comment', 'user_id', 'post_id', 'date_created'],
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

router.get('/', async (req, res) => {
  fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + "BTC,ETH,USDT,BNB,ADA,DOGE,XRP,UDSC,UNI" + "&tsyms=USD&api_key=" + process.env.CC_API_KEY) // full data for several coins
    .then(response => response.json())
    .then(data => {
      const display = data.DISPLAY; // api res for display
      const manipulated = Object.entries(display).reduce((acc, el) => { // this fn turns api res into arr of objects
        Object.entries(el[1]).forEach((display) => {
          display[1].SYM = el[0]
          acc.push(display[1])
        })
        return acc;
      }, [])
      res.render('homepage', { manipulated })
    }
    ).catch(error => {
      console.error('Error:', error);
    })
});
module.exports = router;