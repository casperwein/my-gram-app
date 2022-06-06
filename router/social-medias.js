const express = require("express");
const router = express.Router();
const socialMediaController = require("../controller/socialMediaController");
const authentication = require("../middleware/authentication").verify;
const authorization =
    require("../middleware/authorization").socialMediaAuthorization;

router.use(authentication);
router.post("/", socialMediaController.postSocialMedia);
router.get("/", socialMediaController.getAllSocialMedias);
router.put(
    "/:socialMediaId",
    authorization,
    socialMediaController.updateSocialMedias
);
router.delete(
    "/:socialMediaId",
    authorization,
    socialMediaController.deleteSocialMedia
);

module.exports = router;