const request = require('supertest')
const app = require('../server.js')

describe('Notes API', () => {

  it('should delete a note', async () => {
    const res = await request(app)
      .delete('/api/notes/fcdfce6f-d786-4954-b4dd-ed2e5cd9d579')
      .send({
        id: 'fcdfce6f-d786-4954-b4dd-ed2e5cd9d579'
      })
    const expected = [{
        "title": "test is cool",
        "text": "my note test",
        "id": "fcdfce6f-d786-4954-b4dd-ed2e5cd9d579"
    }];
    expect(res.body).toEqual(
      expect.not.arrayContaining(expected),
    );
  })
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({
        title: 'test is cool',
        text: 'my note test'
      });
      console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        text: expect.any(String)
      })
    ]));
  })


  it('should get the notes', async () => {
    const res = await request(app)
      .get('/api/notes');
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          text: expect.any(String)
        })
      ]));
  })

});
