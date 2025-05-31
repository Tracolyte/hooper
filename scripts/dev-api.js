import express from 'express';
import cors from 'cors';
import signupHandler from '../api/signup.js';
import partnerInterestHandler from '../api/partner-interest.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Wrap serverless functions for Express
app.post('/api/signup', (req, res) => signupHandler(req, res));
app.post('/api/partner-interest', (req, res) => partnerInterestHandler(req, res));

app.listen(port, () => {
  console.log(`Dev API server running at http://localhost:${port}`);
}); 