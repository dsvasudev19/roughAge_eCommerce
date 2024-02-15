'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
    const customers = [
      {
        "first_name": "John",
        "last_name": "Doe",
        "password": "password123",
        "email": "johndoe@example.com",
        "phone": "1234567890"
      },
      {
        "first_name": "Jane",
        "last_name": "Smith",
        "password": "password456",
        "email": "janesmith@example.com",
        "phone": "9876543210"
      },
      {
        "first_name": "Michael",
        "last_name": "Johnson",
        "password": "password789",
        "email": "michaeljohnson@example.com",
        "phone": "4567891230"
      },
      {
        "first_name": "Emily",
        "last_name": "Davis",
        "password": "passwordabc",
        "email": "emilydavis@example.com",
        "phone": "7891234560"
      },
      {
        "first_name": "David",
        "last_name": "Brown",
        "password": "passworddef",
        "email": "davidbrown@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Sarah",
        "last_name": "Wilson",
        "password": "passwordegf",
        "email": "sarahwilson@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Christopher",
        "last_name": "Taylor",
        "password": "passwordhij",
        "email": "christophertaylor@example.com",
        "phone": "9873216540"
      },
      {
        "first_name": "Olivia",
        "last_name": "Anderson",
        "password": "passwordklm",
        "email": "oliviaanderson@example.com",
        "phone": "7418529630"
      },
      {
        "first_name": "Daniel",
        "last_name": "Thomas",
        "password": "passwordnop",
        "email": "danielthomas@example.com",
        "phone": "8529631470"
      },
      {
        "first_name": "Sophia",
        "last_name": "Roberts",
        "password": "passwordqrs",
        "email": "sophiaroberts@example.com",
        "phone": "9631478520"
      },
      {
        "first_name": "Matthew",
        "last_name": "White",
        "password": "passwordtuv",
        "email": "matthewwhite@example.com",
        "phone": "3692581470"
      },
      {
        "first_name": "Ava",
        "last_name": "Clark",
        "password": "passwordwxy",
        "email": "avaclark@example.com",
        "phone": "2581473690"
      },
      {
        "first_name": "Andrew",
        "last_name": "Lewis",
        "password": "passwordzab",
        "email": "andrewlewis@example.com",
        "phone": "1473692580"
      },
      {
        "first_name": "Isabella",
        "last_name": "Hill",
        "password": "passwordcde",
        "email": "isabellahill@example.com",
        "phone": "9632587410"
      },
      {
        "first_name": "Ethan",
        "last_name": "Young",
        "password": "passwordfgh",
        "email": "ethanyoung@example.com",
        "phone": "7412589630"
      },
      {
        "first_name": "Mia",
        "last_name": "Hall",
        "password": "passwordijk",
        "email": "miahall@example.com",
        "phone": "8529637410"
      },
      {
        "first_name": "James",
        "last_name": "Scott",
        "password": "passwordlmn",
        "email": "jamesscott@example.com",
        "phone": "3698521470"
      },
      {
        "first_name": "Charlotte",
        "last_name": "Green",
        "password": "passwordopq",
        "email": "charlottegreen@example.com",
        "phone": "7418529630"
      },
      {
        "first_name": "Benjamin",
        "last_name": "Adams",
        "password": "passwordrst",
        "email": "benjaminadams@example.com",
        "phone": "9638527410"
      },
      {
        "first_name": "Amelia",
        "last_name": "Baker",
        "password": "passworduvw",
        "email": "ameliabaker@example.com",
        "phone": "2589631470"
      },
      {
        "first_name": "Lucas",
        "last_name": "King",
        "password": "passwordxyz",
        "email": "lucasking@example.com",
        "phone": "1479632580"
      },
      {
        "first_name": "Liam",
        "last_name": "Wright",
        "password": "password123",
        "email": "liamwright@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Grace",
        "last_name": "Turner",
        "password": "password456",
        "email": "graceturner@example.com",
        "phone": "9873216540"
      },
      {
        "first_name": "Harper",
        "last_name": "Collins",
        "password": "password789",
        "email": "harpercollins@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Logan",
        "last_name": "Mitchell",
        "password": "passwordabc",
        "email": "loganmitchell@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Chloe",
        "last_name": "Moore",
        "password": "passworddef",
        "email": "chloemoore@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Ryan",
        "last_name": "Ross",
        "password": "passwordegf",
        "email": "ryanross@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Evelyn",
        "last_name": "Morgan",
        "password": "passwordhij",
        "email": "evelynmorgan@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Nathan",
        "last_name": "Reed",
        "password": "passwordklm",
        "email": "nathanreed@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Zoey",
        "last_name": "Perry",
        "password": "passwordnop",
        "email": "zoeyperry@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Aiden",
        "last_name": "Butler",
        "password": "passwordqrs",
        "email": "aidenbutler@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Audrey",
        "last_name": "Long",
        "password": "passwordtuv",
        "email": "audreylong@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Carter",
        "last_name": "Foster",
        "password": "passwordwxy",
        "email": "carterfoster@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Aria",
        "last_name": "Russell",
        "password": "passwordzab",
        "email": "ariarussell@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Henry",
        "last_name": "Griffin",
        "password": "passwordcde",
        "email": "henrygriffin@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Sofia",
        "last_name": "Diaz",
        "password": "passwordfgh",
        "email": "sofiadiaz@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Sebastian",
        "last_name": "Hayes",
        "password": "passwordijk",
        "email": "sebastianhayes@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Avery",
        "last_name": "Myers",
        "password": "passwordlmn",
        "email": "averymyers@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Lily",
        "last_name": "Ford",
        "password": "passwordopq",
        "email": "lilyford@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Dylan",
        "last_name": "Cole",
        "password": "passwordrst",
        "email": "dylancole@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Leah",
        "last_name": "Barnes",
        "password": "passworduvw",
        "email": "leahbarnes@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Gabriel",
        "last_name": "Pearson",
        "password": "passwordxyz",
        "email": "gabrielpearson@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Owen",
        "last_name": "Reynolds",
        "password": "password123",
        "email": "owenreynolds@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Elizabeth",
        "last_name": "Graham",
        "password": "password456",
        "email": "elizabethgraham@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Levi",
        "last_name": "Sullivan",
        "password": "password789",
        "email": "levisullivan@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Victoria",
        "last_name": "Wallace",
        "password": "passwordabc",
        "email": "victoriawallace@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Wyatt",
        "last_name": "Coleman",
        "password": "passworddef",
        "email": "wyattcoleman@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Madison",
        "last_name": "Harrison",
        "password": "passwordegf",
        "email": "madisonharrison@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Elijah",
        "last_name": "Kennedy",
        "password": "passwordhij",
        "email": "elijahkennedy@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Penelope",
        "last_name": "Warren",
        "password": "passwordklm",
        "email": "penelopewarren@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Gavin",
        "last_name": "Dixon",
        "password": "passwordnop",
        "email": "gavindixon@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Nora",
        "last_name": "Gordon",
        "password": "passwordqrs",
        "email": "noragordon@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Jackson",
        "last_name": "Hudson",
        "password": "passwordtuv",
        "email": "jacksonhudson@example.com",
        "phone": "3216549870"
      },
      {
        "first_name": "Layla",
        "last_name": "Peters",
        "password": "passwordwxy",
        "email": "laylapeters@example.com",
        "phone": "6549873210"
      },
      {
        "first_name": "Jack",
        "last_name": "Hunter",
        "password": "passwordzab",
        "email": "jackhunter@example.com",
        "phone": "3216549870"
      }
    ];
    const newData = customers.map((customer) => ({...customer, createdAt: new Date(), updatedAt: new Date()}))
    await queryInterface.bulkInsert('users', newData, {});

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
