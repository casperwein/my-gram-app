'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            "full_name": "dimas",
            "email": "dimas@gmail.com",
            "username": "dimas",
            "password": "$2a$12$4LiC7MVqH2tT/QCOglSJz.t/ErtNNiCaHetnCxiTmoh2osWj84Bqm", // password : dimas
            "profile_image_url": "https://github.com/",
            "age": 45,
            "phone_number": 3234534,
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }], {});
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