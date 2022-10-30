const router = require("express").Router();
const authControllers = require("../../controllers/auth")

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/login/with_token", authControllers.loginWithAccessToken);
router.post("/access_token", authControllers.getAccessToken);
router.post("/forgot_password", authControllers.getAccessToken);

module.exports = router;
