'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Comments', [{
      userId: 1,
      songId: 1,
      body: 'Amazing song, listened to this ever since high school.',
      username: 'Demo-lition',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      songId: 2,
      body: 'I love coldplay!',
      username: 'Demo-lition',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      songId: 3,
      body: 'Thanks for uploading this song!',
      username: 'Demo-lition',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      songId: 4,
      body: 'Ed Sheeran is great!',
      username: 'FakeUser1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      songId: 5,
      body: 'Love this song so much!',
      username: 'FakeUser1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      songId: 6,
      body: 'Ive listened to this song on repeat for 5 hours.',
      username: 'FakeUser1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      songId: 7,
      body: 'Just okay.',
      username: 'FakeUser1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      songId: 8,
      body: 'First things first...',
      username: 'FakeUser2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      songId: 9,
      body: 'Wheres Enemy? Arcane has the best music.',
      username: 'FakeUser2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      songId: 10,
      body: 'A timeless classic.',
      username: 'Demo-lition',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {
      userId: { [Op.in]: [1] }
    }, {});
  }
};
