const router = require("express").Router();
const userControllers = require("../../controllers/user");
const {
  getUserBodySchema,
  addUserBodySchema,
  deleteUserBodySchema,
  deleteUserBulkBodySchema,
} = require("../../middlewares/allowed_request_body_parameters/user");

router.get("/", getUserBodySchema, userControllers.getUser);
router.post("/", addUserBodySchema, userControllers.addUser);
router.delete("/delete", deleteUserBodySchema, userControllers.deleteUser);
router.post(
  "/delete/bulk",
  deleteUserBulkBodySchema,
  userControllers.deleteUserBulk
);

module.exports = router;
