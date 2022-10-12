import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import users from '../database/models/users';

// import { Response } from 'superagent';
import User from '../database/models/users';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
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

const mockMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": 0,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": 0,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
];
const mockMatches2 = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": 0,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": 0,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
];
const mockTeams = [
  {
    id: 1,
    teamName: "Palmeiras",
  },
  {
    id: 2,
    teamName: "outro time",
  },
];

const NewMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
};
const notExistsTeam = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 1111,
  awayTeam: 13,
  awayTeamGoals: 1,
  inProgress: 0,
}
const NewMatch2 = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true 
};

describe('matches', () => {
  describe('metodo GET na /matches', () => {
    beforeEach(() => {
      sinon.stub(Matches, 'findAll').resolves(mockMatches as any)
      sinon.stub(Teams, 'findAll').resolves(mockTeams as Teams[])
      sinon.stub(Matches, 'create').resolves(NewMatch as unknown as Matches);
    });
  
    afterEach(() => {
      sinon.restore();
    });
    it('/matches, retorna todas os jogos do Bd', async () => {
      const response = await chai.request(app).get('/matches');
      chai.expect(response.body).to.deep.equal(mockMatches);
      chai.expect(response.status).to.equal(200);
    });
    it('/matches/:id/finish, retorna uma mensagem dos jogos que ja finalizaram', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(mockMatches2);
    })
    it('/matches, retorna um novo jogo', async () => {
      const response = await chai.request(app).post('/matches').send(NewMatch2).set('authorization', token);
      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.deep.equal(NewMatch);
    })
  })
});

describe('matches não da certo', () => {
  describe('Erros /matches', () => {
    beforeEach(() => {
      sinon.stub(Matches, 'create').resolves(NewMatch2 as unknown as Matches)
  
    });
  
    afterEach(() => {
      sinon.restore();
    });
    it('retorna uma mensagem caso o id não exista e status 404', async () => {
      const response = await chai.request(app).post('/matches').send(notExistsTeam).set('authorization', token);
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ message: 'There is no team with such id!' })
    })
  })
});