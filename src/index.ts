import bodyParser from 'body-parser';
import express from 'express'
import { createJob } from './controllers/jobsController'

const app = express();
const PORT = 8000;

app.use(bodyParser.json())

app.get('/', (req,res) => res.send('Hello World!'));

app.post('/jobs', async (req, res) => createJob(req, res))

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});