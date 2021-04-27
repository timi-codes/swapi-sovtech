import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import express from 'express';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Server } from 'http';
import { applyMiddleware } from 'graphql-middleware';
import SwapiPeopleDatasource from './graphql/datasources';
import config from './config';
import graphqlSchema from './graphql';

interface MyDataSources {
  swapi: any,
}

const { typeDefs, resolvers } = graphqlSchema;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apolloServer = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  ),
  dataSources: (): DataSources<MyDataSources> => ({
    swapi: new SwapiPeopleDatasource(config.apiUrl),
  }),
  formatError: (error: GraphQLError): GraphQLFormattedError => {
    if (error?.extensions?.code !== 'BAD_USER_INPUT') {
      console.error(JSON.stringify(error, null, 2)); // eslint-disable-line no-console
    }
    return error;
  },
});

(async () => {
  await apolloServer.start();
})();
apolloServer.applyMiddleware({ app });

const shutdown = async (serverApp: Server) => {
  console.info('Received kill signal, shutting down gracefully'); // eslint-disable-line no-console
  await serverApp.close();
  return process.exit();
};

const server = app.listen({ port: config.port }, () => console.info(`🚀 Server ready at http://localhost:${config.port }`)); // eslint-disable-line no-console

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});

export default app;