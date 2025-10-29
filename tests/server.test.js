import request from "supertest";
import app from "../src/server.js";
import fs from "fs";

beforeEach(() => {
  if (fs.existsSync("./tasks.json")) fs.unlinkSync("./tasks.json");
});

describe("Task API", () => {
  it("should return an empty task list initially", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should create a new task", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test Task" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });
});