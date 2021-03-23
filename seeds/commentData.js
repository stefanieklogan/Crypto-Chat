const { Comment } = require('../models');

const commentData = [
  {
    "comment": "I agree."
  },
  {
      "comment": "Can anyone answer when crypto currency began?"
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
