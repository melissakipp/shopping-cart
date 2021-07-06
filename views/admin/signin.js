const layout = require('../layout');

module.exports = () => {
  return layout({
    content: `
    <main>
      <form method="POST">
        <input id="email" name="email" placeholder="email" />
        <input id="password" name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </main>  
  `
  });
};