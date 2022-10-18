const express = require('express'); // подключение express
const mongoose = require('mongoose'); // подключение mongoose
const bodyParser = require('body-parser'); // подключение body-parser

require('dotenv').config();

const { celebrate, Joi, errors } = require('celebrate'); // подключение celebrate

// routes
const userRouter = require('./routes/users'); // импортируем роутер users
const cardRouter = require('./routes/cards'); // импортируем роутер cards

const { createUser, login } = require('./controllers/users');

// middlewares
const auth = require('./middlewares/auth');
const ErrorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

// errors
const ErrorNotFound = require('./errors/error-not-found');

const { RegularExpressions } = require('./validator/regular-expressions');

// создаем сервер
const app = express();

// слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cors); // CORS запросы

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(RegularExpressions),
  }),
}), createUser);

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardRouter);

// централизованный обработчик ошибок
app.use(auth, ((req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
}));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());// обработчик ошибок celebrate

// обрабатываем все ошибки
app.use(ErrorHandler);

// порт приложение слушает
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение, прослушивающее порт ${PORT}`);
});
