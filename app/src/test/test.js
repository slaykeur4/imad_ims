var should = require("should");
var assert = require("assert");
var request = require("supertest");
var winston = require("winston");


describe("Routing", function () {
    var url = "http://127.0.0.1:80/";
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    // before(function (done) {
    //     // In our tests we use the test db
    //     models.sequelize.sync()
    //     done();
    // });

    // products tests
    describe("Product", function () {
        it("should create a product", function (done) {
            var product = {
                "name": "ASUS Republic of Gamers GX850 Laser Mouse",
                "desc": "Precision Laser Technology up to 5000dpi",
                "price": 39
            };
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/products and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .post("/api/products/add")
                .send(product)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.status.should.be.equal(200);
                    done();
                });
        });
    });
});
