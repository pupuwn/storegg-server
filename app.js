var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override') //middleware Method-Override
const session = require('express-session') //express-session
const flash = require('connect-flash'); //connect-flash
var cors = require('cors') // middleware CORS

const dashboardRouter = require('./app/dashboard/router');
const categoryRouter = require('./app/category/router');
const nominalRouter = require('./app/nominal/router');
const voucherRouter = require('./app/voucher/router');
const bankRouter = require('./app/bank/router');
const paymentRouter = require('./app/payment/router');
const usersRouter = require('./app/users/router');
const transactionRouter = require('./app/transaction/router');
const playerRouter = require('./app/player/router');
const authRouter = require('./app/auth/router');

const app = express();
const URL = `/api/v1`;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, COPY, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use(cors({
  origin: 'http://localhost:3000'
})); // middleware CORS

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cara pake express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))
app.use(flash()); //cara pake connect-flash
app.use(methodOverride('_method')) //middleware Method-Override

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte/')));

app.use('/', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/nominal', nominalRouter);
app.use('/voucher', voucherRouter);
app.use('/bank', bankRouter);
app.use('/payment', paymentRouter);
app.use('/transaction', transactionRouter);

// api
app.use(`${URL}/players`, playerRouter);
app.use(`${URL}/auth`, authRouter);
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
