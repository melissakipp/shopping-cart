const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/signup');
const signinTemplate = require('../../views/admin/signin');

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

router.post('/signup', async (req, res) => {
  // Destruct
  const { email, password, confirmPassword } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('This email has been regrister already');
  }
  if (password !== confirmPassword) {
    return res.send('Password must match');
  }
  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id;
  res.send('Account created');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send('Email not found');
  }
  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  )
  if (!validPassword) {
    return res.send('Invalid email/password');
  }
  req.session.userId = user.id;
  res.send('You are signed in!!!');
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You have been signed out. See you next time!')
});

module.exports = router;