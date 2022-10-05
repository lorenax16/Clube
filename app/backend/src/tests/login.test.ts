import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import users from '../database/models/users';

import { Response } from 'superagent';
import User from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const token = {
  "token": "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0"
}

const usuario = { 
  email: "admin@admin.com",
  password: "secret_admin"
}
const usuario2 = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

describe('usando o metodo /post no /login', () => {
  describe('POST', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(usuario as User)
    });

    afterEach(() => {
      sinon.restore();
    });
    it('retorna token', async () => {
      const response = await chai.request(app).post('/login').send(usuario);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(usuario2);
    })
  })
  

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
