const express = require('express');
const { BooksController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 *     description: Returns a list books
 *     parameters:
 *      - in: query
 *        name: ids   # Note the name is the same as in the path
 *        required: false
 *        type: array
 *        description: The book ids.
 */
router.get('/', async (req, res) => {
  try {
    if (req.query && req.query.ids) req.query.ids = req.query.ids.split(',');
    if (req.query && req.query.languages) req.query.languages = req.query.languages.split(',');
    if (req.query && req.query.search) req.query.search = req.query.search.split(' ');
    if (req.query && req.query.topic) req.query.topic = req.query.topic.split(',');
    if (req.query && req.query.author) req.query.author = req.query.author.split(',');
    if (req.query && req.query.title) req.query.title = req.query.title.split(',');

    const result = await BooksController.find(req.query);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
