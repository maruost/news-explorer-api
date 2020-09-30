const cardsRouter = require('express').Router();
const { showAllArticles, deleteArticle, createArticle } = require('../controllers/articles');

cardsRouter.get('/', showAllArticles);
cardsRouter.post('/', createArticle);
cardsRouter.delete('/articleId', deleteArticle);

module.exports = cardsRouter;
