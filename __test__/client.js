import supertest from 'supertest';
import app from '../server';

const apolloClient = async ({ ...params } = {}) => await supertest(app).post('/graphql').set('Accept', 'application/json').send(params);
export default apolloClient;
