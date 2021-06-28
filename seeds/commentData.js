const { Comment } = require('../models');

const commentData = [
  {
    "comment": "I agree.",
    "post_id": 2,
    "user_id": 2
  },
  {
    "comment": "Have you had a chance to read the latest article?",
    "post_id": 2,
    "user_id": 2
  },
  {
    "comment": "Can anyone answer when crypto currency began?",
    "post_id": 1,
    "user_id": 1
  }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
