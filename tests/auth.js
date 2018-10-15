const jwt = require("jsonwebtoken");
const auth = require("../auth");

const SECRET = "secret";

describe("Auth", () => {
  it("should clear", () => {
    const token = jwt.sign(
      {
        username: "username",
        password: "encryptedpassword"
      },
      SECRET,
      {
        expiresIn: "2h"
      }
    );
  });
});
