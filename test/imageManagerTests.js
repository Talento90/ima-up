import Lab from 'lab'
import Code from 'code'
import { server } from '../src/index.js'

var lab = exports.lab = Lab.script()

lab.experiment('Basic HTTP Tests', () => {
  lab.test('GET /{yourname*} (endpoint test)', (done) => {
    var options = {
      method: 'GET',
      url: '/api/images/Timmy'
    }

    server.inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(200) //  Expect http response status code to be 200 ("Ok")
      Code.expect(response.result).to.have.length(12) // Expect result to be "Hello Timmy!" (12 chars long)
      server.stop(done) // done() callback is required to end the test.
    })
  })
})
