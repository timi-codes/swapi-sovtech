const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './schema/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './schema/*.resolver.ts'));
const resolvers = mergeResolvers(resolversArray);

export default {
  typeDefs,
  resolvers,
};
