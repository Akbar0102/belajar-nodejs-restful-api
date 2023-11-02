import supertest from "supertest";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "barz",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "barz",
      password: "rahasia",
      name: "Akbar Hidayatuloh",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("barz");
    expect(result.body.data.name).toBe("Akbar Hidayatuloh");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should can reject if username already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "barz",
      password: "rahasia",
      name: "Akbar Hidayatuloh",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("barz");
    expect(result.body.data.name).toBe("Akbar Hidayatuloh");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "barz",
      password: "rahasia",
      name: "Akbar Hidayatuloh",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
