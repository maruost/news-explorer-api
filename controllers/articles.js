/* eslint-disable no-underscore-dangle */
const Article = require('../models/article');
const NotFoundError = require('../helpers/not-found-error');
const AuthErorr = require('../helpers/authorization-error');

module.exports.showAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  return Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемой карточки не существует');
    })
    .then((article) => {
      if (!(String(article.owner) === req.user._id)) {
        throw new AuthErorr('Недостаточно прав для совершения данного действия');
      }
      article.remove();
      return res.send({ data: article });
    })
    .catch(next);
};
