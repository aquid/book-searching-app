const express = require('express');
const { BooksController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     description: Returns a list books
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 */
router.get('/', async (req, res) => {
  try {
    const result = await BooksController.find();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
