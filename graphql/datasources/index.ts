const { RESTDataSource } = require('apollo-datasource-rest');

class SwapiPeopleDatasource extends RESTDataSource {
    constructor(api_url: string) {
        super()
        this.baseURL = api_url;
    }

    async getAll() {

    }

    async getSingle(name: string) {

    }
}

export default SwapiPeopleDatasource;