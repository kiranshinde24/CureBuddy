// generate-hash.js
const bcrypt = require('bcryptjs');

const password = 'admin123'; // choose your desired admin password
bcrypt.hash(password, 10).then((hash) => {
  console.log(hash); // <-- This will be printed in your terminal
});
