const fs = require('fs');

function registerUser(username, password) {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  if (users[username]) throw new Error('User exists');
  users[username] = { password };
  fs.writeFileSync('users.json', JSON.stringify(users));
  return true;
}

function loginUser(username, password) {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  if (users[username] && users[username].password === password) {
    return 'token123';
  } else throw new Error('Invalid credentials');
}

module.exports = { registerUser, loginUser };
