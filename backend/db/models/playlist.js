'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    const joinTable = {
      through: 'PlaylistSong',
      otherKey: 'songId',
      foreignKey: 'playlistId'
    }
    Playlist.belongsTo(models.User, {foreignKey: 'userId'})
    Playlist.belongsToMany(models.Song, joinTable)
  };
  return Playlist;
};