/* eslint-disable class-methods-use-this */
const debug = require('debug')('expense-management-app:controller:user');
const joi = require('@hapi/joi');
const { books_book } = require('../database/models');

/**
 * @swagger
 *
 * definitions:
 *   Book:
 *     type: object
 *     required:
 *       - gutenberg_id
 *       - media_type
 *       - title
 *     properties:
 *       id:
 *         type: integer
 *       download_count:
 *         type: string
 *       gutenberg_id:
 *         type: integer
 *       media_type:
 *         type: string
 *       title:
 *         type: string
 */
class BooksController {
  async find() {
    try {
      const result = await books_book.findAll({ limit: 25 });
      debug(`found the books ${result}`);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = new BooksController();
