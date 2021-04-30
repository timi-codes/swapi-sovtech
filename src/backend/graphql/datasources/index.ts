import { RESTDataSource } from 'apollo-datasource-rest';
import { UserInputError } from 'apollo-server-express';
import { URLSearchParams } from 'url';

interface Person {
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
}

interface Page {
    total: number
    next: string
    previous: string
}

interface PersonResponse {
    data: [Person]
    page: Page
}

interface HomeWorld {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
}

class SwapiPeopleDatasource extends RESTDataSource {
  constructor(apiUrl: string) {
    super();
    this.baseURL = apiUrl;
  }

  async request(url: URLSearchParams): Promise<any>{
    return await this.get(`/people/?${url.toString()}`);
  }

  getRequiredFields = (results: any): [Person] => results.map(({
    name, height, mass, gender, homeworld,
  }: Person) => ({
    name,
    height,
    mass,
    gender,
    homeworld,
  }))

  async getAll({ filter }: any): Promise<PersonResponse> {
    const query = {
      search: filter?.name,
      page: filter?.page && filter?.page > 0 ? filter?.page : 1,
    };

    // remove undefined, empty and null query paramter
    const filteredQuery = Object.entries(query).reduce((a: any, [k, v]: any) => (v == null ? a : (a[k] = v, a)), {});
    const url = new URLSearchParams(filteredQuery);
    const {
      count, next, previous, results,
    } = await this.request(url);

    const data: [Person] = this.getRequiredFields(results);
    return {
      data,
      page: {
        total: count,
        previous,
        next,
      },
    };
  }

  async getHomeWorld({ url }: any): Promise<HomeWorld> {
    const {
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
      population,
    } = await this.get(`${url}`);
    return {
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
      population,
    };
  }
}

export default SwapiPeopleDatasource;
