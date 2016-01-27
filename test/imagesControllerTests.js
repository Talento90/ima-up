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
      server.stop(done)
    })
  })

  lab.test('GET /images (valid id but image does not exists)', (done) => {
    var options = {
      method: 'GET',
      url: '/api/images/66a9490416de9bb820b499f4'
    }

    server.inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(404)
      server.stop(done)
    })
  })
})
