const Comment = require('./Comment.js');
const Post = require('./Post.js');
const User = require('./User.js');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
