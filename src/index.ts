import bodyParser from 'body-parser';
import express from 'express'
import { createJob, getStatus } from './controllers/jobsController'
import { processNextJob } from './domain/jobService'

const app = express();
const PORT = 8000;

app.use(bodyParser.json())

app.post('/jobs', async (req, res) => createJob(req, res))

app.get('/jobs/:id/status', async (req,res) => getStatus(req, res));

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});

// todo: move to actual background service
// in-process loop workaround borrowed from here: https://stackoverflow.com/questions/36904430/how-to-have-my-nodejs-app-run-in-a-loop-for-ever
setInterval(processNextJob, 2000)