var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// https://graphql.org/graphql-js/running-an-express-graphql-server/
var { createHandler } = require('graphql-http/lib/use/express');
var { buildSchema } = require('graphql');

var cors = require('cors');
var shopItemResolvers = require('./resolvers/shopItems');
var orderResolvers = require('./resolvers/orders');
var authResolvers = require('./resolvers/auth');
var jwt = require('jsonwebtoken');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Response {
    status: String
  }

  type Token {
    token: String
  }

  input User {
    username: String
    password: String
    token: String
  }

  input ShopItem {
    shop_item_id: Int
    name: String
    description: String
    image_url: String
    price: Float
  }

  type ShopItemOutput {
    shop_item_id: Int
    name: String
    description: String
    image_url: String
    price: Float
  }

  type OrderOutput {
    order_id: Int
    name: String
    address: String
    phone: String
    ordered_items: [ShopItemOutput]
  }

  input Order {
    order_id: Int
    name: String
    address: String
    phone: String
    ordered_items: [ShopItem]
  }

  type Query {
    getShopItems: [ShopItemOutput]
    getOrders: [OrderOutput]
  }

  type Mutation {
    addShopItem(shopItem: ShopItem): Response
    removeShopItem(shopItemId: Int): Response
    addOrder(order: Order): Response
    removeOrder(orderId: Int): Response
    login(user: User): Token
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  ...shopItemResolvers,
  ...orderResolvers,
  ...authResolvers,
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authMiddleware = (req, res, next) => {
  const { query = '' } = req.body;
  const token = req.get('authorization');
  const requiresAuth = query.includes('removeOrder') ||
        query.includes('removeShopItem') ||
        query.includes('addShopItem');
  if (requiresAuth) {
    try {
      jwt.verify(token, 'secret');
      next();
      return;
    } catch(err) {
      res.status(401).json({});
      return;
    }
  }
  next();
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
