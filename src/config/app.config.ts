import express from 'express';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser = require('cookie-parser');
import { ENV } from './env.config';
import bodyParser from 'body-parser';

/**
 * @note Here add user parameter in Request object.
 */
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      api_key_auth?: string;
      app_key_auth?: string;
    }
  }
}

/** @note Routes */
import IndexRoutes from '../routes/index';
const isProduction = ENV.NODE_ENV === 'production';

// create global app object
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** @note Working way. */
app.use(cors());
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.set('secretKey', ENV.SECRET);

/**
 * @note Connect to DB using mongoose.
 */
app.use(express.urlencoded({extended: true}));
mongoose.connect(ENV.DB_URI);

if (!isProduction) {
  mongoose.set('debug', false);
}

// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));

/** @note Importing all the routes from index file */
app.use(IndexRoutes);

// error handler
// @ts-ignore
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        // @ts-ignore
        errors[key] = err.errors[key].message;
        return errors;
      }, {}),
    });
  }

  return next(err);
});

export default app;
