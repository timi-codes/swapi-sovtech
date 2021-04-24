export default {
    Query: {
        getPeople: async (parent, args, { dataSources }: any) => {
            try {
                return await dataSources.people.getAll();
            } catch (error) {
                return error;
            }
        },
        searchPerson: async (parent, args, { dataSources }: any) => {
            try {
                return await dataSources.people.getSingle();
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {}
}