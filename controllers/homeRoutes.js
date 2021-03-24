const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/dashboard', async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  }).catch((err) => { 
      res.json(err);
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts });
    });

    router.get('/login', async (req, res) => {
      // Send the rendered Handlebars.js template back as the response
      res.render('login');
    });

    router.get('/signup', async (req, res) => {
      // Send the rendered Handlebars.js template back as the response
      res.render('signup');
    });

    router.get('/logout', async (req, res) => {
      // Send the rendered Handlebars.js template back as the response
      res.render('logout');
    });

module.exports = router;

