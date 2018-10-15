const jwt = require("jsonwebtoken");

module.exports = function auth(ctx, next) {
  const token = getToken(ctx.headers);

  if (!token) {
    ctx.throw(403, "Authorization required.");
  }

  jwt.verify(token, "secret", err => {
    if (err) {
      ctx.throw(403, "Authorization required.");
    }

    next();
  });
};

function getToken(headers) {
  if (
    headers.Authorization &&
    headers.Authorization.split(" ")[0] === "Bearer"
  ) {
    return headers.Authorization.split(" ")[1];
  } else {
    return null;
  }
}
