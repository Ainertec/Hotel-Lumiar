import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import http from 'http';

import { errors } from 'celebrate';
import mongoose from 'mongoose';
import routes from './routes';


const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(express.json());
if (!(process.env.NODE_ENV === 'test'))
  mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

app.use(routes);
app.use(errors());
export default server;
