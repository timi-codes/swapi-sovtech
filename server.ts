import express from 'express';
import { Server } from 'http';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import datasources from './graphql/datasources';
import config from './config';
import graphqlSchema from './graphql';

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
  apollo: {
    key: `service:${config.apollo.apikey}`,
    graphVariant: config.apollo.variant,
    graphId: config.apollo.graphId,
  },
  dataSources: () => ({
    swapi: new datasources.Swapi(config.api_url),
  }),
  formatError: (err) => {
    if (err.extensions.code !== 'UNAUTHENTICATED' && err.extensions.code !== 'BAD_USER_INPUT') {
      console.error(JSON.stringify(err, null, 2)); // eslint-disable-line no-console
    }
    return err;
  }
});

(async () => {
  await apolloServer.start();
})();
apolloServer.applyMiddleware({ app });

 const shutdown  = async(serverApp: Server) => {
  console.info('Received kill signal, shutting down gracefully'); // eslint-disable-line no-console
  await serverApp.close();
  return process.exit();
}


const server = app.listen({ port: config.port }, () => console.info(`🚀 Server ready at http://localhost:${config.port}`)); // eslint-disable-line no-console

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});


