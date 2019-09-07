const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    book: [Book]
  }

  type Book {
    id: Int!
    title: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',

    book: () => {
      return {
        id: 1,
        title: 'The one and only book',
      };
    },
  },

  Book: {
    // This method overrides the default resolver for book.title
    title: (book) => book.title + ` resolved`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is listening at ${url}`);
});
