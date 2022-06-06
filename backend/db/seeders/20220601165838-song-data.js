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
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/Coldplay_-_A_Rush_of_Blood_to_the_Head_Cover.png',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Coldplay+-+Clocks.mp3',
      title: 'Clocks',
      genre: 'EDM',
      likes: 10,
      body: 'By Coldplay',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/Coldplay_-_A_Rush_of_Blood_to_the_Head_Cover.png',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Coldplay+-+The+Scientist.mp3',
      title: 'The Scientist',
      genre: 'EDM',
      likes: 5,
      body: 'By Coldplay',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/Coldplay_-_Viva_la_Vida_or_Death_and_All_His_Friends.png',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Coldplay+-+Viva+La+Vida.mp3',
      title: 'Viva La Vida',
      genre: 'EDM',
      likes: 5,
      body: 'By Coldplay',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/barcelona.jpeg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Ed+Sheeran+-+Barcelona+%5BOfficial+Audio%5D.mp3',
      title: 'Barcelona',
      genre: 'EDM',
      likes: 5,
      body: 'By Ed Sheeran',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/barcelona.jpeg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Ed+Sheeran+-+Happier+%5BOfficial+Audio%5D.mp3',
      title: 'Happier',
      genre: 'EDM',
      likes: 5,
      body: 'By Ed Sheeran',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/barcelona.jpeg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Ed+Sheeran+-+Perfect+%5BOfficial+Audio%5D.mp3',
      title: 'Perfect',
      genre: 'EDM',
      likes: 5,
      body: 'By Ed Sheeran',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/barcelona.jpeg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Ed+Sheeran+-+What+Do+I+Know+%5BOfficial+Audio%5D.mp3',
      title: 'What Do I Know',
      genre: 'EDM',
      likes: 5,
      body: 'By Ed Sheeran',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/Imagine-Dragons-Believer-art.jpg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Imagine+Dragons+-+Believer+(Audio).mp3',
      title: 'Believer',
      genre: 'EDM',
      likes: 5,
      body: 'By Imagine Dragons',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/Imagine-Dragons-Believer-art.jpg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/Imagine+Dragons+-+Thunder.mp3',
      title: 'Thunder',
      genre: 'EDM',
      likes: 5,
      body: 'By Imagine Dragons',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      imageUrl: 'https://soundnebula.s3.us-west-2.amazonaws.com/x%26y.jpg',
      url: 'https://soundnebula.s3.us-west-2.amazonaws.com/X%26Y+-+Coldplay+-+Fix+You.mp3',
      title: 'Fix You',
      genre: 'EDM',
      likes: 5,
      body: 'By Coldplay',
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
      title: { [Op.in]: ['Doin it Right', 'Test Song'] }
    }, {});
  }
};
