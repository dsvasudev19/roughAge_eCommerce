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
    const reviews = [
      {
        "reviewable_id": "1",
        "reviewable_type": "Product",
        "userId": "1",
        "content": "Great Product!",
        "rating": "5"
      },
      {
        "reviewable_id": "2",
        "reviewable_type": "Product",
        "userId": "2",
        "content": "The Product was amazing.",
        "rating": "4"
      },
      {
        "reviewable_id": "3",
        "reviewable_type": "Product",
        "userId": "3",
        "content": "Clean and comfortable.",
        "rating": "4"
      },
      {
        "reviewable_id": "4",
        "reviewable_type": "Product",
        "userId": "4",
        "content": "Not as expected.",
        "rating": "2"
      },
      {
        "reviewable_id": "5",
        "reviewable_type": "Product",
        "userId": "5",
        "content": "Beautiful location.",
        "rating": "5"
      },
      {
        "reviewable_id": "6",
        "reviewable_type": "Product",
        "userId": "6",
        "content": "Spacious and well-maintained.",
        "rating": "5"
      },
      {
        "reviewable_id": "7",
        "reviewable_type": "Product",
        "userId": "7",
        "content": "Noisy neighbors.",
        "rating": "3"
      },
      {
        "reviewable_id": "8",
        "reviewable_type": "Product",
        "userId": "8",
        "content": "Friendly staff.",
        "rating": "4"
      },
      {
        "reviewable_id": "9",
        "reviewable_type": "Product",
        "userId": "9",
        "content": "Cozy atmosphere.",
        "rating": "5"
      },
      {
        "reviewable_id": "10",
        "reviewable_type": "Product",
        "userId": "10",
        "content": "Uncomfortable bed.",
        "rating": "2"
      },
      {
        "reviewable_id": "11",
        "reviewable_type": "Product",
        "userId": "11",
        "content": "Amazing amenities.",
        "rating": "5"
      },
      {
        "reviewable_id": "12",
        "reviewable_type": "Product",
        "userId": "12",
        "content": "Clean and modern.",
        "rating": "4"
      },
      {
        "reviewable_id": "13",
        "reviewable_type": "Product",
        "userId": "13",
        "content": "No hot water.",
        "rating": "2"
      },
      {
        "reviewable_id": "14",
        "reviewable_type": "Product",
        "userId": "14",
        "content": "Great views.",
        "rating": "5"
      },
      {
        "reviewable_id": "15",
        "reviewable_type": "Product",
        "userId": "15",
        "content": "Poorly maintained.",
        "rating": "3"
      },
      {
        "reviewable_id": "16",
        "reviewable_type": "Product",
        "userId": "16",
        "content": "Friendly staff.",
        "rating": "4"
      },
      {
        "reviewable_id": "17",
        "reviewable_type": "Product",
        "userId": "17",
        "content": "Convenient location.",
        "rating": "5"
      },
      {
        "reviewable_id": "18",
        "reviewable_type": "Product",
        "userId": "18",
        "content": "Spacious and comfortable.",
        "rating": "5"
      },
      {
        "reviewable_id": "19",
        "reviewable_type": "Product",
        "userId": "19",
        "content": "Noisy air conditioning.",
        "rating": "3"
      },
      {
        "reviewable_id": "20",
        "reviewable_type": "Product",
        "userId": "20",
        "content": "Excellent service.",
        "rating": "5"
      },
      {
        "reviewable_id": "21",
        "reviewable_type": "Product",
        "userId": "21",
        "content": "Outdated furniture.",
        "rating": "2"
      },
      {
        "reviewable_id": "22",
        "reviewable_type": "Product",
        "userId": "22",
        "content": "Clean and cozy.",
        "rating": "4"
      },
      {
        "reviewable_id": "23",
        "reviewable_type": "Product",
        "userId": "23",
        "content": "Beautiful gardens.",
        "rating": "5"
      },
      {
        "reviewable_id": "24",
        "reviewable_type": "Product",
        "userId": "24",
        "content": "Noisy street.",
        "rating": "3"
      },
      {
        "reviewable_id": "25",
        "reviewable_type": "Product",
        "userId": "25",
        "content": "Comfortable bed.",
        "rating": "4"
      },
      {
        "reviewable_id": "26",
        "reviewable_type": "Product",
        "userId": "26",
        "content": "Great location.",
        "rating": "5"
      },
      {
        "reviewable_id": "27",
        "reviewable_type": "Product",
        "userId": "27",
        "content": "Dirty bathProduct.",
        "rating": "2"
      },
      {
        "reviewable_id": "28",
        "reviewable_type": "Product",
        "userId": "28",
        "content": "Friendly staff.",
        "rating": "4"
      },
      {
        "reviewable_id": "29",
        "reviewable_type": "Product",
        "userId": "29",
        "content": "Amazing views.",
        "rating": "5"
      },
      {
        "reviewable_id": "30",
        "reviewable_type": "Product",
        "userId": "30",
        "content": "Small and cramped.",
        "rating": "3"
      },
      {
        "reviewable_id": "31",
        "reviewable_type": "Product",
        "userId": "31",
        "content": "Cozy atmosphere.",
        "rating": "4"
      },
      {
        "reviewable_id": "32",
        "reviewable_type": "Product",
        "userId": "32",
        "content": "Convenient location.",
        "rating": "5"
      },
      {
        "reviewable_id": "33",
        "reviewable_type": "Product",
        "userId": "33",
        "content": "Spacious and clean.",
        "rating": "5"
      },
      {
        "reviewable_id": "34",
        "reviewable_type": "Product",
        "userId": "34",
        "content": "Noisy neighbors.",
        "rating": "3"
      },
      {
        "reviewable_id": "35",
        "reviewable_type": "Product",
        "userId": "35",
        "content": "Friendly staff.",
        "rating": "4"
      },
      {
        "reviewable_id": "36",
        "reviewable_type": "Product",
        "userId": "36",
        "content": "Comfortable and modern.",
        "rating": "5"
      },
      {
        "reviewable_id": "37",
        "reviewable_type": "Product",
        "userId": "37",
        "content": "No hot water.",
        "rating": "2"
      },
      {
        "reviewable_id": "38",
        "reviewable_type": "Product",
        "userId": "38",
        "content": "Great location.",
        "rating": "5"
      },
      {
        "reviewable_id": "39",
        "reviewable_type": "Product",
        "userId": "39",
        "content": "Poorly maintained.",
        "rating": "3"
      },
      {
        "reviewable_id": "40",
        "reviewable_type": "Product",
        "userId": "40",
        "content": "Friendly staff.",
        "rating": "4"
      },
      {
        "reviewable_id": "41",
        "reviewable_type": "Product",
        "userId": "41",
        "content": "Convenient location.",
        "rating": "5"
      },
      {
        "reviewable_id": "42",
        "reviewable_type": "Product",
        "userId": "42",
        "content": "Spacious and comfortable.",
        "rating": "5"
      },
      {
        "reviewable_id": "43",
        "reviewable_type": "Product",
        "userId": "43",
        "content": "Noisy air conditioning.",
        "rating": "3"
      },
      {
        "reviewable_id": "44",
        "reviewable_type": "Product",
        "userId": "44",
        "content": "Excellent service.",
        "rating": "5"
      },
      {
        "reviewable_id": "45",
        "reviewable_type": "Product",
        "userId": "45",
        "content": "Outdated furniture.",
        "rating": "2"
      },
      {
        "reviewable_id": "46",
        "reviewable_type": "Product",
        "userId": "46",
        "content": "Clean and cozy.",
        "rating": "4"
      },
      {
        "reviewable_id": "47",
        "reviewable_type": "Product",
        "userId": "47",
        "content": "Beautiful gardens.",
        "rating": "5"
      },
      {
        "reviewable_id": "48",
        "reviewable_type": "Product",
        "userId": "48",
        "content": "Noisy street.",
        "rating": "3"
      },
      {
        "reviewable_id": "49",
        "reviewable_type": "Product",
        "userId": "49",
        "content": "Comfortable bed.",
        "rating": "4"
      },
      {
        "reviewable_id": "50",
        "reviewable_type": "Product",
        "userId": "50",
        "content": "Great location.",
        "rating": "5"
      }
    ];
    return await queryInterface.bulkInsert("reviews", reviews.map((review) => ({...review, createdAt: new Date(), updatedAt: new Date()})), {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('reviews', null, {})
  }
};
