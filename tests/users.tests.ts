import { NextFunction, Request, Response } from "express";
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const adminUser ={
    email: "juhan@juurikas.ee",
    password: "juhan"
}

const newTestUser ={
    firstName: "test",
    lastName: "user",
    email: "test@user.ee",
    password: "test"
}



const wrongUser ={
    email: "juhan@wrong.ee",
    password: "wrongPW"
}

describe('Users controller', () => {
    describe('GET /api/v1/users', () => {
      it('responds with error message and statusCode 401', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.false;
       expect(response.body.message).to.be.equal("Token not found")
      });
      it('responds with token message and statusCode 200', async () => {
        const login = await request(app).post('/api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(app).get('/api/v1/users').set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.true;
        expect(response.body.users).to.be.a("array");
        expect(response.body.users.length).to.be.gt(1);
      }); 
      it('responds with error message and statusCode 404', async () => {
        const login = await request(app).post('/api/v1/login').send(wrongUser);
        const token = login.body.token;
        const response = await request(app).get('/api/v1/users').set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.false;
        expect(response.body.message).to.be.equal("Token invalid")
      }); 
    });

    describe('POST /api/v1/users', () => {
        it('responds with error message and statusCode 401', async () => {
          const response = await request(app).post('/api/v1/users');
          expect(response.body).to.be.a('object');
          expect(response.statusCode).to.equal(401);
          expect(response.body.success).to.false;
          expect(response.body.message).to.be.equal("Token not found")
        });
        it('responds with message User created and statusCode 201', async () => {
            const login = await request(app).post('/api/v1/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).post('/api/v1/users').set("Authorization", `Bearer ${token}`).send(newTestUser);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(201);
            expect(response.body.success).to.true;

          }); 
          it('responds with error message and statusCode 400', async () => {
            const login = await request(app).post('/api/v1/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).post('/api/v1/users').set("Authorization", `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(400);
            expect(response.body.success).to.false;
            expect(response.body.message).to.be.a("string");
            expect(response.body.message).to.be.equal("Email error");
          }); 
    });

  });