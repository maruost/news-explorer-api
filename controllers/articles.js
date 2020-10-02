const Article = require('../models/article');
const NotFoundError = require('../helpers/not-found-error');
const AuthErorr = require('../helpers/authorization-error');
const { errMessages } = require('../data/messages');

module.exports.showAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
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
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => {
      throw new NotFoundError(errMessages.card);
    })
    .then((article) => {
      if (!(String(article.owner) === req.user._id)) {
        throw new AuthErorr(errMessages.access);
      }
      article.remove();
      return res.send({ data: article });
    })
    .catch(next);
};
