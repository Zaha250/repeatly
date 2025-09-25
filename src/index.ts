import express from "express";
import { appConfig } from './core/config/index.js';

const app = express();
const port = appConfig.PORT;
console.log({port});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
