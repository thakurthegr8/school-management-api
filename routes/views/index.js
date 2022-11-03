const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).render("index");
});
router.get("/dashboard", async (req, res) => {
  const cookies = req.cookies;
  console.log(req.headers);
  const accessToken = cookies[process.env.COOKIE_KEY];
  try {
    const dashboardDetails = await fetch(
      "http://localhost:3000/api/auth/login/with_token",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const dashboardDetailsData = await dashboardDetails.json();
    console.log(dashboardDetailsData);
  } catch (error) {
    console.log("error" + error);
  }
  return res.status(200).render("dashboard");
});

module.exports = router;
