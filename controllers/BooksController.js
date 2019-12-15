const debug = require('debug')('expense-management-app:controller:user');
const Joi = require('@hapi/joi');
const {
  Books, Author, BookShelves, Subjects, Languages, Formats, Sequelize,
} = require('../database/models');

const { Op } = Sequelize;


const ParamsFilter = Joi.object({
  ids: Joi.array().items(Joi.string(), Joi.number()).single(),
  search: Joi.array().items(Joi.string()).single(),
});

const getQueryFilter = () => ({
  include: [
    {
      model: Author,
      as: 'authors',
      attributes: ['birth_year', 'death_year', 'name'],
      where: {},
      through: { attributes: [] },
    },
    {
      model: BookShelves,
      as: 'bookshelves',
      attributes: ['name'],
      through: { attributes: [] },
    },
    {
      model: Subjects,
      as: 'subjects',
      through: { attributes: [] },
    },
    {
      model: Languages,
      as: 'languages',
      through: { attributes: [] },
    },
    {
      model: Formats,
      as: 'formats',
      attributes: ['mime_type', 'url'],
    },
  ],
  limit: 25,
  distinct: true,
  where: {},
  order: [['download_count', 'DESC NULLS LAST']],
});


const buildFilter = (filter, queryFilter, lastIndex, searchKey) => {
  const filterCopy = { ...queryFilter };
  if (filter.ids) {
    if (filterCopy.where && filterCopy.where[Op.or]) {
      filterCopy[Op.or].push({ id: { [Op.in]: filter.ids } });
    } else {
      filterCopy.where[Op.or] = [];
      filterCopy.where[Op.or].push({ id: { [Op.in]: filter.ids } });
    }
  }

  if (filter.search) {
    if (filterCopy.where && filterCopy.where[Op.or]) {
      filter.search.forEach((text) => {
        filterCopy.where[Op.or].push({ [searchKey]: { [Op.iLike]: `${text}%` } });
      });
      if (!lastIndex) {
        buildFilter(filter, filterCopy.include[0], true, 'name');
      }
    } else {
      filterCopy.where[Op.or] = [];
      filter.search.forEach((text) => {
        filterCopy.where[Op.or].push({ [searchKey]: { [Op.iLike]: `${text}%` } });
      });
      if (!lastIndex) {
        buildFilter(filter, filterCopy.include[0], true, 'name');
      }
    }
  }
  return filterCopy;
};

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
  constructor() {
    this.paramsFilter = ParamsFilter;
    this.buildFilter = buildFilter;
  }

  async find(filter) {
    try {
      await this.paramsFilter.validateAsync(filter);
      const filterGen = this.buildFilter(filter, getQueryFilter(), false, 'title');

      const result = await Books.findAndCountAll(filterGen);

      const books = JSON.parse(JSON.stringify(result));

      books.rows = books.rows.map((row) => {
        const book = { ...row };
        book.bookshelves = row.bookshelves.map((el) => el.name);
        book.subjects = row.subjects.map((el) => el.name);
        book.languages = row.languages.map((el) => el.code);
        return book;
      });
      debug(`found the books ${books}`);
      return books;
    } catch (error) {
      debug(`an error occured dureing fetch ${error}`);
      return Promise.reject(error);
    }
  }
}

module.exports = new BooksController();
