const { ApolloServer, gql } = require('apollo-server');
const { fakedb: db } = require('./fake-db');

const typeDefs = gql`
  type Query {
    hello: String
    books(first: Int): [Book]
    book(id: Int!): Book
    authors: [Author]
    author(id: Int!): Author
  }

  type Book {
    id: Int!
    title: String
    author: Author
  }

  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }

  # Draft for a mutation
  #type Mutation {
  #  createAuthor(...)
  #}
`;

const resolvers = {
  Query: {
    hello: () => 'world',

    books: (_, { first }) => db.getBooks(first),

    book: (_, { id }) => db.getBookById(id),

    authors: () => db.getAuthors(),

    author: (_, { id }) => db.getAuthorById(id),
  },

  Book: {
    // This method would override the default resolver for book.title
    // title: (book) => book.title + ` resolved`,

    author: book => db.getAuthorById(book.authorId),
  },

  Author: {
    books: author => db.getBooksByAuthorId(author.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is listening at ${url}`);
});
