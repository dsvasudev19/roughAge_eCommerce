'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [
      {
        "first_name": "John",
        "last_name": "Doe",
        "gender": "Male",
        "location": "New York",
        
        "email": "johndoe@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "1234567890"
      },
      {
        "first_name": "Jane",
        "last_name": "Smith",
        "gender": "Female",
        "location": "Los Angeles",
        
        "email": "janesmith@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "9876543210"
      },
      {
        "first_name": "Michael",
        "last_name": "Johnson",
        "gender": "Male",
        "location": "Chicago",
        // "dob": "1985-03-03",
        "email": "michaeljohnson@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "5555555555"
      },
      {
        "first_name": "Emily",
        "last_name": "Brown",
        "gender": "Female",
        "location": "Houston",
        
        "email": "emilybrown@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "1111111111"
      },
      {
        "first_name": "Daniel",
        "last_name": "Lee",
        "gender": "Male",
        "location": "Phoenix",
        // "dob": "1982-05-05",
        "email": "daniellee@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "9999999999"
      },
      {
        "first_name": "Olivia",
        "last_name": "Wilson",
        "gender": "Female",
        "location": "Philadelphia",
        // "dob": "1993-06-06",
        "email": "oliviawilson@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "2222222222"
      },
      {
        "first_name": "David",
        "last_name": "Taylor",
        "gender": "Male",
        "location": "San Antonio",
        // "dob": "1987-07-07",
        "email": "davidtaylor@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "8888888888"
      },
      {
        "first_name": "Sophia",
        "last_name": "Thomas",
        "gender": "Female",
        "location": "San Diego",
        // "dob": "1998-08-08",
        "email": "sophiathomas@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "3333333333"
      },
      {
        "first_name": "James",
        "last_name": "Anderson",
        "gender": "Male",
        "location": "Dallas",
        // "dob": "1984-09-09",
        "email": "jamesanderson@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "7777777777"
      },
      {
        "first_name": "Isabella",
        "last_name": "Martinez",
        "gender": "Female",
        "location": "San Jose",
        // "dob": "1996-10-10",
        "email": "isabellamartinez@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "4444444444"
      },
      {
        "first_name": "Joseph",
        "last_name": "Hernandez",
        "gender": "Male",
        "location": "Austin",
        // "dob": "1983-11-11",
        "email": "josephhernandez@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "6666666666"
      },
      {
        "first_name": "Mia",
        "last_name": "Lopez",
        "gender": "Female",
        "location": "Jacksonville",
        // "dob": "1994-12-12",
        "email": "mialopez@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "5555555555"
      },
      {
        "first_name": "Charles",
        "last_name": "Gonzalez",
        "gender": "Male",
        "location": "San Francisco",
        // "dob": "1981-01-13",
        "email": "charlesgonzalez@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "4444444444"
      },
      {
        "first_name": "Ava",
        "last_name": "Perez",
        "gender": "Female",
        "location": "Columbus",
        // "dob": "1991-02-14",
        "email": "avaperez@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "3333333333"
      },
      {
        "first_name": "Matthew",
        "last_name": "Robinson",
        "gender": "Male",
        "location": "Indianapolis",
        // "dob": "1986-03-15",
        "email": "matthewrobinson@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "2222222222"
      },
      {
        "first_name": "Sofia",
        "last_name": "Cook",
        "gender": "Female",
        "location": "Seattle",
        // "dob": "1997-04-16",
        "email": "sofiacook@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "1111111111"
      },
      {
        "first_name": "Andrew",
        "last_name": "Murphy",
        "gender": "Male",
        "location": "Denver",
        // "dob": "1989-05-17",
        "email": "andrewmurphy@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "9999999999"
      },
      {
        "first_name": "Abigail",
        "last_name": "Bell",
        "gender": "Female",
        "location": "Washington",
        // "dob": "1992-06-18",
        "email": "abigailbell@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "8888888888"
      },
      {
        "first_name": "Christopher",
        "last_name": "Bailey",
        "gender": "Male",
        "location": "Boston",
        // "dob": "1980-07-19",
        "email": "christopherbailey@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "7777777777"
      },
      {
        "first_name": "Charlotte",
        "last_name": "Gomez",
        "gender": "Female",
        "location": "Nashville",
        // "dob": "1993-08-20",
        "email": "charlottegomez@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "6666666666"
      },
      {
        "first_name": "Daniel",
        "last_name": "Hill",
        "gender": "Male",
        "location": "Las Vegas",
        // "dob": "1982-09-21",
        "email": "danielhill@example.com",
        "password": "$2b$10$OJxrXhqW113L/eq1qwgQoOncXzURfotGGmHcKWYxCYtM6ZouEwUWa",
        "phone": "5555555555"
      }
    ];
    return queryInterface.bulkInsert('users', users.map((user,index)=>({...user,createdAt:new Date(),updatedAt:new Date()})), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
