import bodyParser from 'body-parser';
import express from 'express'
import { createJob, getStatus } from './controllers/jobsController'

const app = express();
const PORT = 8000;

app.use(bodyParser.json())

app.post('/jobs', async (req, res) => createJob(req, res))

app.get('/jobs/:id/status', async (req,res) => getStatus(req, res));

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});

// todo: move to actual background service
function execute(){
    console.log('hello')    
}

setInterval(execute, 2000)