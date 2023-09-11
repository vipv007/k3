const request = require('supertest');
const server = require('./server'); // Import your Express.js server

describe('Server tests', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  test('GET /', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBe('Hello, World!');
        done();
      });
  });
});
