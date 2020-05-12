import { applyMiddleware } from 'redux';

import loggerMW from './logger';
import auth from './auth';
import routesMW from './routes';


export default applyMiddleware(
  loggerMW,
  auth,
  routesMW,
);
