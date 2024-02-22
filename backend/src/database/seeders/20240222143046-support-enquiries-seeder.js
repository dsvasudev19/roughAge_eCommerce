'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const enquiries = [
      {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "message": "Hello, I have a question about my recent order."
      },
      {
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "message": "Hi, I wanted to inquire about your product availability."
      },
      {
        "name": "Michael Johnson",
        "email": "michaeljohnson@example.com",
        "message": "Good day, I need assistance with my account settings."
      },
      {
        "name": "Emily Davis",
        "email": "emilydavis@example.com",
        "message": "Hello, I'm experiencing an issue with your website."
      },
      {
        "name": "David Wilson",
        "email": "davidwilson@example.com",
        "message": "Hi, I have a suggestion for improving your services."
      },
      {
        "name": "Olivia Martinez",
        "email": "oliviamartinez@example.com",
        "message": "Good day, I need help with a billing inquiry."
      },
      {
        "name": "Daniel Anderson",
        "email": "danielanderson@example.com",
        "message": "Hello, I'm interested in your latest product release."
      },
      {
        "name": "Sophia Thomas",
        "email": "sophiathomas@example.com",
        "message": "Hi, I have a question regarding your return policy."
      },
      {
        "name": "Matthew Taylor",
        "email": "matthewtaylor@example.com",
        "message": "Good day, I need assistance with a recent purchase."
      },
      {
        "name": "Ava Hernandez",
        "email": "avahernandez@example.com",
        "message": "Hello, I'm having trouble accessing my account."
      },
      {
        "name": "Emma Moore",
        "email": "emmamoore@example.com",
        "message": "Hi, I wanted to provide feedback on my recent interaction with your support team."
      },
      {
        "name": "Joseph Clark",
        "email": "josephclark@example.com",
        "message": "Good day, I have a question about your product specifications."
      },
      {
        "name": "Madison Lewis",
        "email": "madisonlewis@example.com",
        "message": "Hello, I'm interested in becoming a reseller of your products."
      },
      {
        "name": "Ethan Young",
        "email": "ethanyoung@example.com",
        "message": "Hi, I need assistance with a technical issue."
      },
      {
        "name": "Chloe Rodriguez",
        "email": "chloerodriguez@example.com",
        "message": "Good day, I have a suggestion for your website design."
      },
      {
        "name": "Oliver Walker",
        "email": "oliverwalker@example.com",
        "message": "Hello, I'm having trouble placing an order on your website."
      },
      {
        "name": "Mia Hall",
        "email": "miahall@example.com",
        "message": "Hi, I wanted to inquire about your shipping options."
      },
      {
        "name": "Lucas Green",
        "email": "lucasgreen@example.com",
        "message": "Good day, I need help with a product return."
      },
      {
        "name": "Isabella Adams",
        "email": "isabellaadams@example.com",
        "message": "Hello, I'm interested in your current promotions."
      },
      {
        "name": "Sebastian Baker",
        "email": "sebastianbaker@example.com",
        "message": "Hi, I have a question about your warranty coverage."
      },
      {
        "name": "Sophie Hill",
        "email": "sophiehill@example.com",
        "message": "Good day, I need assistance with a password reset."
      },
      {
        "name": "Benjamin Nelson",
        "email": "benjaminnelson@example.com",
        "message": "Hello, I'm experiencing issues with your mobile app."
      },
      {
        "name": "Avery Campbell",
        "email": "averycampbell@example.com",
        "message": "Hi, I wanted to provide feedback on my recent purchase."
      },
      {
        "name": "Grace Mitchell",
        "email": "gracemitchell@example.com",
        "message": "Good day, I have a question about your product availability."
      }
    ].map((item) => ({...item, createdAt: new Date(), updatedAt: new Date()}))
    return queryInterface.bulkInsert('support_enquiries', enquiries, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
