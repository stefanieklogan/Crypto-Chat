const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  res.render('homepage');
});

// router.get('/post', withAuth, async (req, res) => {
//   res.render('post', { 
//     posts, 
//     logged_in: req.session.logged_in 
//   });
// });

router.get('/post', withAuth, async (req, res) => {
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

router.get('/coin', withAuth, async (req, res) => {
  res.render('coin');
});

module.exports = router;


