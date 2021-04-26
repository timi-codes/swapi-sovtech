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

class SwapiPeopleDatasource extends RESTDataSource {
    constructor(api_url: string) {
        super()
        this.baseURL = api_url;
    }

    didEncounterError({ message, extensions }: any) {
        if (extensions && extensions.response.body.message) throw new UserInputError(extensions.response.body.message, extensions);
        throw new Error(message);
    }

    getRequiredFields(results: any) {
        return  results.map(({ name, height, mass, gender, homeworld }: Person) => ({
            name,
            height,
            mass,
            gender,
            homeworld,
        }));
    }

    async getAll({ filter }: any) {
        const query = {
            search: filter?.name,
            page: filter?.page && filter?.page > 0 ? filter?.page : 1
        };

        //remove undefined, empty and null query paramter
        let filteredQuery =  Object.entries(query).reduce((a: any,[k,v]: any) => (v == null ? a : (a[k]=v, a)), {});
        const url = new URLSearchParams(filteredQuery);
        const { count, next, previous, results } = await this.get(`/people/?${url.toString()}`);
        
        const data: [Person] = this.getRequiredFields(results)
        return {
            data,
            page: {
                total: count,
                previous,
                next
            },
        }
    }
    async getHomeWorld({ url }: any) {
        const {
            name,
            rotation_period,
            orbital_period,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water,
            population
        } = await this.get(`${url}`)
        return {
            name,
            rotation_period,
            orbital_period,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water,
            population
        }
    }
}

export default SwapiPeopleDatasource;