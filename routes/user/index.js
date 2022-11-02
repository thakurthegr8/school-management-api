const router = require("express").Router();
const userControllers = require("../../controllers/user");
const {
  getUserBodySchema,
  addUserBodySchema,
  deleteUserBodySchema,
} = require("../../middlewares/allowed_request_body_parameters/user");

router.get("/", getUserBodySchema, userControllers.getUser);
router.post("/", addUserBodySchema, userControllers.addUser);
router.delete("/delete", deleteUserBodySchema, userControllers.deleteUser);

module.exports = router;
