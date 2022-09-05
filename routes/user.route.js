const express = require("express");
const router = express.Router();

const useController = require("../controller/user.controller");

// get random user
router.route("/random").get(useController.getRandomUser);

// get all users
router.route("/all").get(useController.getAllUser);

// post user
router.route("/save").post(useController.saveUser);

router.route("/update").patch(useController.updateUser);

router.route("/bulk-update").patch(useController.bulkUpdate);

router.route("/delete").delete(useController.deleteUser);

module.exports = router;
