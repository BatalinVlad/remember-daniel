require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const lettersRoute = require('./routes/letters-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: ['', 'http://localhost:5173']
}));

app.use('/api/letters', lettersRoute);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pewgfj1.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server is running on port:', process.env.PORT || 3001);
    });
  })
  .catch(err => console.log(err));
