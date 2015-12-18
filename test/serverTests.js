import Lab from "lab";    // load Lab module
import Code from "code";  //assertion library
import { server } from "../src/index.js"; // our index.js from above

var lab = exports.lab = Lab.script(); //export test script

lab.experiment("Basic HTTP Tests", function() {
    // tests
    lab.test("GET /{yourname*} (endpoint test)", function(done) {
        var options = {
            method: "GET",
            url: "/Timmy"
        };
        // server.inject lets you similate an http request
        server.inject(options, function(response) {
            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result).to.have.length(12); // Expect result to be "Hello Timmy!" (12 chars long)
            server.stop(done);  // done() callback is required to end the test.
        });
    });
});