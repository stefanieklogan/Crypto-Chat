const { User } = require('../models');

const userData = [
  {
    "email": "raquel@email.com",
    "name": "Raquel",
    "password": "password"
  },
  {
    "email": "stefanie@email.com",
    "name": "Stefanie",
    "password": "password"
  },
  {
    "email": "marisa@email.com",
    "name": "Marisa",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
