const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenctication = require("../middleware/authentication").verify;
const authorization = require("../middleware/authorization").userAuthorization;
const { userValidation } = require("../middleware/validation");

// deploy

router.post("/register", userValidation.userSignUp, userController.signUp);
router.post("/login", userValidation.userSignIn, userController.signIn);
router.put(
    "/update/:userId",
    authenctication,
    authorization,
    userValidation.userUpdate,
    userController.updateUser
);
router.delete(
    "/delete/:userId",
    authenctication,
    authorization,
    userController.deleteUser
);

module.exports = router;