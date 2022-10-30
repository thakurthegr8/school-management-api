const router = require("express").Router();
const userControllers = require("../../controllers/user");
const { isAdmin } = require("../../middlewares");

router.get("/", userControllers.getUser);
router.post("/", isAdmin, userControllers.addUser);
router.delete("/delete", isAdmin, userControllers.deleteUser);

module.exports = router;
