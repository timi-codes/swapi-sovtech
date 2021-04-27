const supertest = require('supertest');
const { app } = require('../server');

const apolloClient = async ({...params} = {}) => await supertest(app).post('/graphql').set('Accept', 'application/json').send(params);
module.exports = apolloClient;
