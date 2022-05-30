'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png?20160131100336'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    body: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {});
  Song.associate = function(models) {
    const joinTable = {
      through: 'PlaylistSong',
      otherKey: 'playlistId',
      foreignKey: 'songId'
    }
    // associations can be defined here
    Song.hasMany(models.Comment, {foreignKey: 'songId'})
    Song.belongsTo(models.User, {foreignKey: 'userId'})
    Song.belongsToMany(models.Playlist, joinTable)
  };
  return Song;
};