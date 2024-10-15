import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://asktask-api.stagelab.co.uk/graphql",
  cache: new InMemoryCache(),
});

export default client;
