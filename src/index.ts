import express from 'express'

const app = express();
const PORT = 8000;

app.get('/', (req,res) => res.send('Hello World!'));

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});