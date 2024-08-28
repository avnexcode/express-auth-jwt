import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import * as middlewares from './middlewares';
import api from './api';

require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  credentials: true, 
  origin: ['http://localhost:3005'],
}));
app.use(express.json());

app.use('/api/v1', api);

app.use(middlewares.responseHandler);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
