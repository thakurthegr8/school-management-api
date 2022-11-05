const urlGenerator = (req, res, next) => {
  const { host } = req.headers;
  let protocol = "http";
  if (req.headers["x-forwarded-proto"]) {
    protocol = "https";
  } else if (req.headers.referrer) {
    protocol = req.headers.referrer.split(":")[0];
  }
  const url = `${protocol}://${host}`;
  console.log(url);
  req.url = url;
  next();
};

module.exports = { urlGenerator };
