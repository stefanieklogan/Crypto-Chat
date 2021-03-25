const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
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
      res.render('login');
    });

    router.get('/signup', async (req, res) => {
      res.render('signup');
    });

    router.get('/logout', async (req, res) => {
      res.render('logout');
    });

module.exports = router;

