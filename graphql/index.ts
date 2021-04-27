import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './schema/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './schema/*.resolver.ts'));
const resolvers = mergeResolvers(resolversArray);

export default {
  typeDefs,
  resolvers,
};
