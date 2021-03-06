const Article = require("../models/article");
const NotFoundError = require("../helpers/not-found-error");
const AuthErorr = require("../helpers/authorization-error");
const ForbiddenError = require("../helpers/forbidden-error");
const { errMessages } = require("../data/messages");

module.exports.showAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) =>
      res.status(201).send({
        data: {
          _id: article._id,
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          date: article.date,
          source: article.source,
          link: article.link,
          image: article.image,
        },
      })
    )
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError(errMessages.card);
    })
    .then((article) => {
      if (!(String(article.owner) === req.user._id)) {
        throw new ForbiddenError(errMessages.access);
      }
      article.remove();
      return res.send({
        data: {
          _id: article._id,
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          date: article.date,
          source: article.source,
          link: article.link,
          image: article.image,
        },
      });
    })
    .catch(next);
};
