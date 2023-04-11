import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://glints.kandaka.my.id/",
    cache: new InMemoryCache()
})


export default client