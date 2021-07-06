const layout = require('../layout');

module.exports = ({ req }) => {
  return layout({
    content: `
    <main>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input id="email" name="email" placeholder="email" />
        <input id="password" name="password" placeholder="password" />
        <input id="confirmPassword" name="confirmPassword" placeholder="confirm password" />
        <button>Sign Up</button>
      </form>
    </main>
  `
  });
};