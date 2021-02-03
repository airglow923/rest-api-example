import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Drop and resync');
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
  res.json({ message: 'GET HTTPS request' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});