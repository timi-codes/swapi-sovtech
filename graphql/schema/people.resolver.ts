export default {
    Query: {
        getPeople: async (_parent: any, args: any, { dataSources }: any) => {
            try {
                return await dataSources.people.getAll();
            } catch (error) {
                return error;
            }
        },
        searchPerson: async (parent: any, args: any, { dataSources }: any) => {
            try {
                return await dataSources.people.getSingle();
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {}
}