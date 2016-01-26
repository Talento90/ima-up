import Lab from 'lab'
import Code from 'code'
import { server } from '../src/index.js'

var lab = exports.lab = Lab.script()

lab.experiment('Images Api Tests', () => {
  lab.test('GET /images (invalid id)', (done) => {
    var options = {
      method: 'GET',
      url: '/api/images/invalidId'
    }

    server.inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done) // done() callback is required to end the test.
    })
  })
})
