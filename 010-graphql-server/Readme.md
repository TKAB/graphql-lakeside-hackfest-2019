# Log of the workshop

- Start server with: `$ node 010-graphl-server/server.js`
- For auto reload on file change: `$ npx nodemon 010-graphl-server/server.js`
- Open `localhost:4000` in the browser

Example query
```
query {
  hello
  author(id: 21) {
    firstName
    lastName
  }
  book(id: 11) {
    title
  }
  books {
    id
    title
  }
}
```