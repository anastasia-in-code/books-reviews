import express from 'express'
import { graphql, buildSchema } from "graphql"
import http from 'http'
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import cors from 'cors'
import loaders from './loaders.js';

import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js';

const app = express();

app.use(cors());

const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: {
    loaders:loaders()},
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// More required logic for integrating with Express
await server.start();
server.applyMiddleware({
  app,
  path: '/',
});

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
