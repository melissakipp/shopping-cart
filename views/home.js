const layout = require('./layout');

module.exports = () => {
  return layout({
    content: `
      <main class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <a class="button is-primary" href="/signin">Sign In</a>
            <br>
            <a class="button is-info" href="/signup">Need an account? Sign Up</a>
          </div>
        </div>
      </main>
    `
  });
};