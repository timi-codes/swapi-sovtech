const apolloClient = require('./client');
const { getPeopleQuery } = require('./queries');
const peopleData = require('./static/people.json');
const homeWorldData = require('./static/homeworld.json');
const SwapiPeopleDataSource = require('../graphql/datasources');

const swapiApiMock = jest.fn(async () => {
  return Promise.resolve(peopleData);
});

const getHomeWorldMock = jest.fn(async () => {
  return Promise.resolve(homeWorldData);
});

describe('people.integration', () => {
    beforeAll(async () => {
      jest.spyOn(SwapiPeopleDataSource.prototype, 'request').mockImplementation(swapiApiMock);
      jest.spyOn(SwapiPeopleDataSource.prototype, 'getHomeWorld').mockImplementation(getHomeWorldMock);
    });
    afterAll(async () => {
      jest.restoreAllMocks();
    });
    test('should get people', async () => {
      const { statusCode, body: { data: { getPeople } } } = await apolloClient({
        query: getPeopleQuery,
      });
      expect(statusCode).toBe(200);
      expect(getPeople.data).toHaveLength(10);
      expect(getPeople).toHaveProperty('page');
      expect(getPeople.page).toHaveProperty('home_world');
    });
});