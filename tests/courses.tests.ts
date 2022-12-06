import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const adminUser ={
    email: "juhan@juurikas.ee",
    password: "juhan"
}

const wrongUser ={
    email: "juhan@wrong.ee",
    password: "wrongPW"
}

describe('Courses controller', () => {
    describe('GET /api/v1/courses', () => {
      it('responds with error message and statusCode 401', async () => {
        const response = await request(app).get('/api/v1/courses');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.false;
       expect(response.body.message).to.be.equal("Token not found")
      });
      it('responds with token message and statusCode 200', async () => {
        const login = await request(app).post('/api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(app).get('/api/v1/courses').set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.true;
        expect(response.body.courses).to.be.a("array");
        expect(response.body.courses.length).to.be.gt(1);
      }); 
    });
    describe('POST /api/v1/courses', () => {
      it('responds with error message and statusCode 401', async () => {
        const response = await request(app).post('/api/v1/courses');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.false;
        expect(response.body.message).to.be.equal("Token not found")
      });
      it('responds with message Course created and statusCode 201', async () => {
          const login = await request(app).post('/api/v1/login').send(adminUser);
          const token = login.body.token;
          const newTestCourse = {
            courseName: "test"
          };
          const response = await request(app).post('/api/v1/courses').set("Authorization", `Bearer ${token}`).send(newTestCourse);
          expect(response.body).to.be.a('object');
          expect(response.statusCode).to.equal(201);
          expect(response.body.success).to.true;

        }); 

  });
  });