export default {
  Query: {
    getPeople: async (_parent: any, { filter }: any, { dataSources }: any) => {
      try {
        return await dataSources.swapi.getAll({ filter });
      } catch (error) {
        return error;
      }
    },
  },
  Person: {
    home_world: async ({ homeworld }: any, args: any, { dataSources }: any) => dataSources.swapi.getHomeWorld({ url: homeworld }),
  },
};
