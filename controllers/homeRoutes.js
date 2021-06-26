const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
require("dotenv").config();
const fs = require('fs');

router.get('/post/:id', async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'date_created', 'user_id'],
        }
      ]
    });

    const allComments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    if (!onePost) {
      res.status(404).json({
        message: 'No post found with this id!'
      });
      return;
    }

    const rendPost = onePost.get({
      plain: true
    });

    const rendComms = allComments.map(
      (comment) => comment.get({
        plain: true
      }));

    res.render('activePost', {
      rendPost,
      rendComms,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post by user
router.get('/udpost/:id', async (req, res) => {
  try {
    const udPost = await Post.findOne({
      where: {
        id: req.params.id,
      }
    })

    if (!udPost) {
      res.status(404).json({
        message: 'No post found with this id!'
      });
      return;
    }

    const postDatas = udPost.get({
      plain: true
    });

    res.render('udpost',
      {
        postDatas,
        logged_in: req.session.logged_in
      });

  } catch (err) {
    res.status(500).json(err);
  }
});

//user sees their own posts
router.get('/userposts', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(
      req.session.user_id,
      {
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post
          }
        ]
      });

    const user = userData.get({
      plain: true
    });

    res.render('userposts',
      {
        ...user,
        logged_in: true
      });

  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.get('/post', async (req, res) => {
  let postData = await Post.findAll({
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render('post', { posts, logged_in: req.session.logged_in });
});

// all posts on home page
router.get('/dashboard', async (req, res) => {

  const postData = await Post.findAll({
    // sort: [Post.date_created, 'DESC'],
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['comment', 'date_created', 'user_id'],
      },
    ]
  }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render('dashboard', {
    posts,
    logged_in: req.session.logged_in
  })
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