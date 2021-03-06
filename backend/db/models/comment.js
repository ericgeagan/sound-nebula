'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: 'userId'})
    Comment.belongsTo(models.Song, {foreignKey: 'songId', onDelete: 'cascade'})
  };
  return Comment;
};