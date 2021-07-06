const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/signup');
const signinTemplate = require('../../views/admin/signin');
const {
  requireEmail,
  requirePassword,
  requireConfirmPassword,
  requireEmailExists,
  requireValidPasswordForUser } = require('./validators');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <a href="/signup">Sign up</a><br />
    <a href="#">Sign in</a>
  `);
});

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post('/signup', [requireEmail, requirePassword, requireConfirmPassword],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    const { email, password, confirmPassword } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    res.send('Account created');
  });

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post('/signin', [requireEmailExists, requireValidPasswordForUser], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(signinTemplate({ errors }));
  }
  const { email } = req.body;
  const user = await usersRepo.getOneBy({ email });

  req.session.userId = user.id;
  res.send('You are signed in!!!');
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You have been signed out. See you next time!')
});

module.exports = router;