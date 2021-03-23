const { Post } = require('../models');

const postData = [
  {
    "title": "What's the best advice for investing?",
    "content": "I've often been asked this question. Do I invest a lot initially or spread-out investments? Well, the answer depends on if you want to make a lot of money. Curious? Yeah, so am I.",
    "user_id": 1
  },
  {
      "title": "Crypto chat: Be you, be heard.",
      "content": "Welcome to crypto chat! We're a community built on helping others navigate a lot of information. Spoiler alert - we're not hear to suppress opinions and facts.",
      "user_id": 2
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;