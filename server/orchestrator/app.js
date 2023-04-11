const { ApolloServer, gql } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { jobTypeDefs, jobResolvers } = require("./schemas/jobSchema");
const { userTypeDefs, userResolvers } = require("./schemas/userSchema");




const server = new ApolloServer({
  typeDefs: [userTypeDefs, jobTypeDefs],
  resolvers: [userResolvers, jobResolvers],
  introspection: true
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log("Running on port 4000");
});
