const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenctication = require("../middleware/authentication").verify;
const authorization = require("../middleware/authorization").userAuthorization;


// deploy

router.post("/register", userController.signUp);
router.post("/login", userController.signIn);
router.put(
    "/update/:userId",
    authenctication,
    authorization,
    userController.updateUser
);
router.delete(
    "/delete/:userId",
    authenctication,
    authorization,
    userController.deleteUser
);

module.exports = router;