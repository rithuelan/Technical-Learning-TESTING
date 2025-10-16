const fetch = require('node-fetch');

async function getUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
}

module.exports = getUser;
