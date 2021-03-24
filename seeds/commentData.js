const { Comment } = require('../models');

const commentData = [
  {
    "comment": "I agree.",
    "post_id": 2,
    "user_id": 3
  },
  {
      "comment": "Can anyone answer when crypto currency began?",
      "post_id": 1,
      "user_id": 3
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
