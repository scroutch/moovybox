import { applyMiddleware } from 'redux';

import loggerMW from './logger';
import auth from './auth';


export default applyMiddleware(
  loggerMW,
  auth,
);
