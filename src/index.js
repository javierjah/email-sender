import 'dotenv/config';
import 'regenerator-runtime/runtime';

import express from 'express';
import cors from 'cors';
import routes from './routes';

// env config vars
const ENV = process.env.NODE_ENV || 'development';

// CONSTANTS
const PORT = process.env.PORT || 3003;
const API_VERSION = process.env.API_VERSION || '/api/v1';

// express setup
const app = express();

// express configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app routes setup
app.use(`${API_VERSION}/email`, routes.email);

app.get('/healthz', (req, res) => {
  // TODO: return 200 if healthy, and anything else will fail

  return res.status(200).send('I am happy and healthy\n');
});

app.listen(PORT, () => {
  console.log(`email-sender-service listening on port ${PORT}, on ${ENV} env`);
});
