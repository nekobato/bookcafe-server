const Router = require("koa-router");
const jwt = require("jsonwebtoken");

const router = new Router();

router.post("/login", async ctx => {
  const payload = {
    username: ctx.query.username,
    password: encrypt(ctx.query.password)
  };

  user = await Users.findOne(payload);

  if (!user) {
    ctx.throw(400, "User not found.");
  }

  const token = jwt.sign(user, "secret string", {
    expiresIn: "2h"
  });
});

router.post("/logout", ctx => {});

module.exports = router;
