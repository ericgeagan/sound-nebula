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
    return queryInterface.bulkInsert('Songs', [{
      userId: 1,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png?20160131100336',
      url: 'https://cloudify.s3.us-west-2.amazonaws.com/2ef37c13d6fc439eb2beb243fb7fa4cf.mp3',
      title: 'Doin it Right',
      genre: 'EDM',
      likes: 10,
      body: 'Written and performed by French electronic music duo Daft Punk and American musician Panda Bear of the band Animal Collective.',
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
  }
};
