const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { showAllArticles, deleteArticle, saveArticle } = require('../controllers/articles');
const linkValidator = require('../helpers/linkValidator');

cardsRouter.get('/', showAllArticles);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(linkValidator),
    image: Joi.string().required().custom(linkValidator),
  }),
}), saveArticle);

cardsRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = cardsRouter;
