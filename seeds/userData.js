const { User } = require('../models');

const userData = [
  {
    "email": "emily@email.com",
    "name": "Emily",
    "password": "password"
  },
  {
    "email": "stefanie@email.com",
    "name": "Stefanie",
    "password": "password"
  },
  {
    "email": "amy@email.com",
    "name": "Amy",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
