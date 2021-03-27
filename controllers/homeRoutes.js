const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage');
});

router.get('/dashboard', withAuth, async (req, res) => {
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

module.exports = router;


