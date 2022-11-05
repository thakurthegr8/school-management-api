const router = require("express").Router();
const authControllers = require("../../controllers/auth");
const {
  signUpBodySchema,
  loginBodySchema,
  getAccessTokenBodySchema,
} = require("../../middlewares/allowed_request_body_parameters/auth");

router.post("/signup", signUpBodySchema, authControllers.signup);
router.post("/login", loginBodySchema, authControllers.login);
router.get("/login/with_token", authControllers.loginWithAccessToken);
router.post(
  "/access_token",
  getAccessTokenBodySchema,
  authControllers.getAccessToken
);
router.post("/forgot_password", authControllers.getAccessToken);
router.get("/profile", authControllers.getProfile);

module.exports = router;
