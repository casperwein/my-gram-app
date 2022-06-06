const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const authentication = require("../middleware/authentication").verify;
const authorization =
    require("../middleware/authorization").commentAuthorization;

router.use(authentication);

router.post("/", commentController.postComment);
router.get("/", commentController.getAllComment);
router.put("/:commentId", authorization, commentController.updateComments);
router.delete("/:commentId", authorization, commentController.deleteComments);

module.exports = router;