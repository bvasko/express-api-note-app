const request = require('supertest')
const app = require('../server.js')

describe('Post Endpoints', () => {
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({
        title: 'test is cool',
        text: 'my note test'
      })
      console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body[0]).toHaveProperty('text')
  })
})
