
    npx express-generator
    npm i cors jsonwebtoken sqlite3 express-graphql graphql

## Notes

`express-graphql` is perimate, replaced by graphql-http

fixed command

    npm i cors jsonwebtoken sqlite3 graphql-http graphql

Doc: https://github.com/graphql/graphql-http#migrating-express-graphql

## Query Graphql

    curl -X POST -H "Content-Type: application/json" \
    -d '{"query": "{ getOrders }"}' \
    http://localhost:3000/graphql

## Query database
If any error like

    Error: SQLITE_ERROR: no such table: shop_items

Create the database if any

    sqlite3 db.sqlite < db.sql

Query the database

    sqlite3 db.sqlite

List all tables

    .tables

List content of a table

    .schema shop_items

Exit

    .exit
