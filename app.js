require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./helpers/rate-limiter');
const mainRouter = require('./routes/index');
const { errMessages } = require('./data/messages');
const NotFoundError = require('./helpers/not-found-error');

const { PORT = 3000, NODE_ENV, DATA_URI } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATA_URI : 'mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', mainRouter);

app.use(errorLogger);

app.use((req, res) => {
  throw new NotFoundError(errMessages.resource);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errMessages.server
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
