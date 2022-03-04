import chai from "chai";
import chatHttp from "chai-http";
import { it } from "mocha";
import { faker } from "@faker-js/faker";
import server from "../index.js";
chai.use(chatHttp);
chai.should();

describe("Register", () => {
  it("should return response 201 when register api is called", (done) => {
    const data = {
      email: faker.internet.email(),
      phone: "07865459845",
      password: "Password@123",
    };
    console.log("mail", data.email);
    chai
      .request(server)
      .post("/api/user/register")
      .send(data)
      .end((req, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should return response 201 when body gets validated", (done) => {
    const data = {
      email: faker.internet.email(),
      phone: "7865459845",
      password: "Password@123",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(data)
      .end((req, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should return response 401 when body does not gets validated", (done) => {
    const data = {
      email: faker.internet.email(),
      phone: "+917865459845",
      password: "Pas123",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(data)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("should return response 201 when gets valid response from service", (done) => {
    const data = {
      email: faker.internet.email(),
      phone: "+917865459845",
      password: "Pasword@123",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(data)
      .end((req, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should return response 401 when body does not gets valid response from service", (done) => {
    const data = {
      email: faker.internet.email(),
      phone: "+917865459845",
      password: "Pas123",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(data)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("should return response 201 when user gets registered", (done) => {
    const data = {
      email: faker.internet.email(),
      phone: "+917865459845",
      password: "Pasword@123",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(data)
      .end((req, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
