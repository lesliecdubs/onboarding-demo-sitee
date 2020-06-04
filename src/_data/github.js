const fetch = require('node-fetch');

module.exports = async () => {
  const user = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME}`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return {
    username: user.login,
    avatar: user.avatar_url,
    url: user.html_url,
  };
};
