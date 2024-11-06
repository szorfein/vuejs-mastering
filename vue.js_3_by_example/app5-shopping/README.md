
## Learned

Frontend
- use [pinia](https://pinia.vuejs.org/) (state, getters, actions)
- make graphql request with
  [graphql-request](https://www.npmjs.com/package/graphql-request)

Backend
- graphql
- sqlite3
- express

for GraphQL, we need to write our `resolvers` - see -> `backend/resolvers`. After that,
we have to map `resolvers` to `queries` and `mutation` (special GraphQL syntax) 

Define graphql schema in `backend/app.js`.

DEBUG=backend:* npm start
