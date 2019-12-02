import portfinder from 'portfinder'
import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    "A simple query"
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

portfinder.getPort(
  {
    port: 3000,
    stopPort: 3333,
  },
  (err, port) => {
    if (err) throw err

    server.listen(port).then(({ url }) => {
      console.log(`Server ready at ${url}`)
    })
  }
)
