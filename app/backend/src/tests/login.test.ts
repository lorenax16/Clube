import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import users from '../database/models/users';

// import { Response } from 'superagent';
import User from '../database/models/users';
import Teams from '../database/models/teams'
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


chai.use(chaiHttp);

const { expect } = chai;
const teams1 = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
};

const teams = { times: [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]};

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
const token = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";

describe('USers', () => {
  describe('metodo POST na /login ', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(usuario2 as User);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      // sinon.stub(jwt, 'sign').returns('oi');

     });

    afterEach(() => {
      sinon.restore();
    });
    it('/login retorna o token e informação do usuario', async () => {
      const response = await chai.request(app).post('/login').send(usuario);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal({ token: token});
    });
  });
});

describe('Users', () => {
  describe('metodo GET na /login/validate', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(usuario2 as User);
      sinon.stub(jwt, 'verify').returns();
  
    });
  
    afterEach(() => {
      sinon.restore();
    });
    it('login/validate, retorna um objeto com o role depois de validado', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', token);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal({ role: usuario2.role });
    })
  })
});

describe('teams', () => {
  describe('metodo GET na /teams', () => {
    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves(teams as unknown as Teams[]);
      sinon.stub(Teams, 'findByPk').resolves(teams1 as Teams)
  
    });
  
    afterEach(() => {
      sinon.restore();
    });
    it('/teams, retorna todas as teams', async () => {
      const response = await chai.request(app).get('/teams');
      chai.expect(response.status).to.equal(200);
    });
    it('/teams/:id, retorna so um teams', async () => {
      const response = await chai.request(app).get('/teams/1');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(teams1);
    })
  })
});


