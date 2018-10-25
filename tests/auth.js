const axios = require("axios");
const { UserModel } = require("../models");

describe("Auth Request", () => {
  let req;

  beforeAll(async () => {
    req = axios.create({
      baseUrl: "http://localhost:3000/api"
    });

    await UserModel.create({
      username: "testuser",
      password: "passphrase"
    })
  })

  afterAll(async () => {
    await UserModel.findOneAndDelete({
      username: "testuser"
    })
  })

  it("can login", async () => {
    const res = await req.post("auth/login", {
      username: "testuser",
      password: "passphrase"
    });
    expect(res.data.user.name).toBe("testuser");
    expect(res.data.token).toBeDefined();
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  });

  it("can get logined status", () => {
    const res = await req.post("auth/status");
    expect(res.data.user.name).toBe("testuser");
  });
});
