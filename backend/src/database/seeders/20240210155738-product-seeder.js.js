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
    const products = [
      {
        "productId": "1",
        "storeId": "1",
        "productName": "Product 1",
        "productSlug": "product-1",
        "productDescription": "Description of Product 1",
        "productPrice": "10.99",
        "productStock": "50",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 1"
      },
      {
        "productId": "2",
        "storeId": "1",
        "productName": "Product 2",
        "productSlug": "product-2",
        "productDescription": "Description of Product 2",
        "productPrice": "19.99",
        "productStock": "30",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 2"
      },
      {
        "productId": "3",
        "storeId": "1",
        "productName": "Product 3",
        "productSlug": "product-3",
        "productDescription": "Description of Product 3",
        "productPrice": "15.49",
        "productStock": "80",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 3"
      },
      {
        "productId": "4",
        "storeId": "1",
        "productName": "Product 4",
        "productSlug": "product-4",
        "productDescription": "Description of Product 4",
        "productPrice": "9.99",
        "productStock": "100",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 4"
      },
      {
        "productId": "5",
        "storeId": "1",
        "productName": "Product 5",
        "productSlug": "product-5",
        "productDescription": "Description of Product 5",
        "productPrice": "12.99",
        "productStock": "75",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 5"
      },
      {
        "productId": "6",
        "storeId": "1",
        "productName": "Product 6",
        "productSlug": "product-6",
        "productDescription": "Description of Product 6",
        "productPrice": "7.99",
        "productStock": "60",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 6"
      },
      {
        "productId": "7",
        "storeId": "1",
        "productName": "Product 7",
        "productSlug": "product-7",
        "productDescription": "Description of Product 7",
        "productPrice": "14.99",
        "productStock": "90",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 7"
      },
      {
        "productId": "8",
        "storeId": "1",
        "productName": "Product 8",
        "productSlug": "product-8",
        "productDescription": "Description of Product 8",
        "productPrice": "11.99",
        "productStock": "120",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 8"
      },
      {
        "productId": "9",
        "storeId": "1",
        "productName": "Product 9",
        "productSlug": "product-9",
        "productDescription": "Description of Product 9",
        "productPrice": "16.99",
        "productStock": "150",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 9"
      },
      {
        "productId": "10",
        "storeId": "1",
        "productName": "Product 10",
        "productSlug": "product-10",
        "productDescription": "Description of Product 10",
        "productPrice": "13.99",
        "productStock": "110",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 10"
      },
      {
        "productId": "11",
        "storeId": "1",
        "productName": "Product 11",
        "productSlug": "product-11",
        "productDescription": "Description of Product 11",
        "productPrice": "8.99",
        "productStock": "70",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 11"
      },
      {
        "productId": "12",
        "storeId": "1",
        "productName": "Product 12",
        "productSlug": "product-12",
        "productDescription": "Description of Product 12",
        "productPrice": "17.99",
        "productStock": "95",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 12"
      },
      {
        "productId": "13",
        "storeId": "1",
        "productName": "Product 13",
        "productSlug": "product-13",
        "productDescription": "Description of Product 13",
        "productPrice": "10.49",
        "productStock": "130",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 13"
      },
      {
        "productId": "14",
        "storeId": "1",
        "productName": "Product 14",
        "productSlug": "product-14",
        "productDescription": "Description of Product 14",
        "productPrice": "15.99",
        "productStock": "160",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 14"
      },
      {
        "productId": "15",
        "storeId": "1",
        "productName": "Product 15",
        "productSlug": "product-15",
        "productDescription": "Description of Product 15",
        "productPrice": "12.49",
        "productStock": "140",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 15"
      },
      {
        "productId": "16",
        "storeId": "1",
        "productName": "Product 16",
        "productSlug": "product-16",
        "productDescription": "Description of Product 16",
        "productPrice": "9.49",
        "productStock": "105",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 16"
      },
      {
        "productId": "17",
        "storeId": "1",
        "productName": "Product 17",
        "productSlug": "product-17",
        "productDescription": "Description of Product 17",
        "productPrice": "18.49",
        "productStock": "165",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 17"
      },
      {
        "productId": "18",
        "storeId": "1",
        "productName": "Product 18",
        "productSlug": "product-18",
        "productDescription": "Description of Product 18",
        "productPrice": "7.49",
        "productStock": "135",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 18"
      },
      {
        "productId": "19",
        "storeId": "1",
        "productName": "Product 19",
        "productSlug": "product-19",
        "productDescription": "Description of Product 19",
        "productPrice": "14.49",
        "productStock": "170",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 19"
      },
      {
        "productId": "20",
        "storeId": "1",
        "productName": "Product 20",
        "productSlug": "product-20",
        "productDescription": "Description of Product 20",
        "productPrice": "11.49",
        "productStock": "145",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 20"
      },
      {
        "productId": "21",
        "storeId": "1",
        "productName": "Product 21",
        "productSlug": "product-21",
        "productDescription": "Description of Product 21",
        "productPrice": "16.49",
        "productStock": "175",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 21"
      },
      {
        "productId": "22",
        "storeId": "1",
        "productName": "Product 22",
        "productSlug": "product-22",
        "productDescription": "Description of Product 22",
        "productPrice": "13.49",
        "productStock": "150",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 22"
      },
      {
        "productId": "23",
        "storeId": "1",
        "productName": "Product 23",
        "productSlug": "product-23",
        "productDescription": "Description of Product 23",
        "productPrice": "8.49",
        "productStock": "115",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 23"
      },
      {
        "productId": "24",
        "storeId": "1",
        "productName": "Product 24",
        "productSlug": "product-24",
        "productDescription": "Description of Product 24",
        "productPrice": "17.49",
        "productStock": "180",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 24"
      },
      {
        "productId": "25",
        "storeId": "1",
        "productName": "Product 25",
        "productSlug": "product-25",
        "productDescription": "Description of Product 25",
        "productPrice": "10.99",
        "productStock": "50",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 25"
      },
      {
        "productId": "26",
        "storeId": "1",
        "productName": "Product 26",
        "productSlug": "product-26",
        "productDescription": "Description of Product 26",
        "productPrice": "19.99",
        "productStock": "30",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 26"
      },
      {
        "productId": "27",
        "storeId": "1",
        "productName": "Product 27",
        "productSlug": "product-27",
        "productDescription": "Description of Product 27",
        "productPrice": "15.49",
        "productStock": "80",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 27"
      },
      {
        "productId": "28",
        "storeId": "1",
        "productName": "Product 28",
        "productSlug": "product-28",
        "productDescription": "Description of Product 28",
        "productPrice": "9.99",
        "productStock": "100",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 28"
      },
      {
        "productId": "29",
        "storeId": "1",
        "productName": "Product 29",
        "productSlug": "product-29",
        "productDescription": "Description of Product 29",
        "productPrice": "12.99",
        "productStock": "75",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 29"
      },
      {
        "productId": "30",
        "storeId": "1",
        "productName": "Product 30",
        "productSlug": "product-30",
        "productDescription": "Description of Product 30",
        "productPrice": "7.99",
        "productStock": "60",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 30"
      },
      {
        "productId": "31",
        "storeId": "1",
        "productName": "Product 31",
        "productSlug": "product-31",
        "productDescription": "Description of Product 31",
        "productPrice": "14.99",
        "productStock": "90",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 31"
      },
      {
        "productId": "32",
        "storeId": "1",
        "productName": "Product 32",
        "productSlug": "product-32",
        "productDescription": "Description of Product 32",
        "productPrice": "11.99",
        "productStock": "120",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 32"
      },
      {
        "productId": "33",
        "storeId": "1",
        "productName": "Product 33",
        "productSlug": "product-33",
        "productDescription": "Description of Product 33",
        "productPrice": "16.99",
        "productStock": "150",
        "productStatus": "Available",
        "productBrand": "roughage",
        "productCategory": "Category 33"
      }
    ]
    return queryInterface.bulkInsert('Products', products.map((product,index)=>(
      {...product,createdAt:new Date(),updatedAt:new Date()})), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
