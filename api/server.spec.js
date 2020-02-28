const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

describe("server", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return 401", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });

    describe("POST /", function() {
        beforeEach(async() => {
            await db('users').truncate()
        })
        it("it should return status code 201", function(done) {
            request(server)
            .post("/api/auth/register")
            .send({username: "don", password: "doggg"})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                done()
            })
        })
    })


    describe("POST /", function() {
        it("it should return status code 200", function(done) {
            request(server)
            .post("/api/auth/login")
            .send({username: "don", password: "doggg"})
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                done()
            })
        })
    })


});
