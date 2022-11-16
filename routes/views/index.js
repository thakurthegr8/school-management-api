const { urlGenerator } = require("../../middlewares/url_parser");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).render("index");
});

router.get("/dashboard", urlGenerator, async (req, res) => {
  const cookies = req.cookies;
  const accessToken = cookies[process.env.COOKIE_KEY];
  if (!accessToken) return res.status(404).redirect("/404");
  try {
    const dashboardDetails = await fetch(`${req.url}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const dashboardDetailsData = await dashboardDetails.json();
    console.table(dashboardDetailsData);
    return res
      .status(200)
      .render("dashboard", { user: { ...dashboardDetailsData, accessToken } });
  } catch (error) {
    return res.status(404);
  }
});

router.get("/user", urlGenerator, async (req, res) => {
  const cookies = req.cookies;
  const accessToken = cookies[process.env.COOKIE_KEY];
  if (!accessToken) return res.status(404).redirect("/404");
  try {
    const userList = await fetch(`${req.url}/api/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userListData = await userList.json();
    console.table(userListData);
    return res.status(200).render("user", { users: userListData });
  } catch (error) {
    return res.status(404);
  }
});

router.get("/class", urlGenerator, async (req, res) => {
  const cookies = req.cookies;
  const accessToken = cookies[process.env.COOKIE_KEY];
  if (!accessToken) return res.status(404).redirect("/404");
  try {
    const dashboardDetails = await fetch(`${req.url}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const dashboardDetailsData = await dashboardDetails.json();
    console.table(dashboardDetailsData);
    return res
      .status(200)
      .render("classes", { user: { ...dashboardDetailsData, accessToken } });
  } catch (error) {
    return res.status(404);
  }
});

router.get("/subject", urlGenerator, async (req, res) => {
  const cookies = req.cookies;
  const accessToken = cookies[process.env.COOKIE_KEY];
  if (!accessToken) return res.status(404).redirect("/404");
  try {
    const subjects = await fetch(`${req.url}/api/subject/admin`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const subjectsData = await subjects.json();
    console.log(subjectsData);
    return res.status(200).render("subject", { subjects: subjectsData });
  } catch (error) {
    return res.status(404);
  }
});

module.exports = router;
