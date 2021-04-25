import { RESTDataSource, Response } from 'apollo-datasource-rest';
import { UserInputError } from 'apollo-server-express';

class SwapiPeopleDatasource extends RESTDataSource {
    constructor(api_url: string) {
        super()
        this.baseURL = api_url;
    }

    // didEncounterError({ message, extensions }) {
    //     if (extensions && extensions.response.body.message) throw new UserInputError(extensions.response.body.message, extensions);
    //     throw new Error(message, extensions);
    // }

    async getAll() {

    }

    async getSingle(name: string) {

    }
}

export default SwapiPeopleDatasource;