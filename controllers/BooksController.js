const debug = require('debug')('expense-management-app:controller:user');
const Joi = require('@hapi/joi');
const {
  Books, Author, BookShelves, Subjects, Languages, Formats, Sequelize,
} = require('../database/models');

const { Op } = Sequelize;

/**
 * Joi validator schema for the request filter
 * which is to be sent with the API. This schema
 * defined which keys are allowed and which aren't
 */
const ParamsFilter = Joi.object({
  ids: Joi.array().items(Joi.string(), Joi.number()).single(),
  search: Joi.array().items(Joi.string()).single(),
  languages: Joi.array().items(Joi.string()).single(),
  topic: Joi.array().items(Joi.string()).single(),
  author: Joi.array().items(Joi.string()).single(),
  title: Joi.array().items(Joi.string()).single(),
});

/**
 * A simple function return an empty filter object
 * for queries to help them create fresh copies of
 * filter object.
 */
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
      where: {},
      through: { attributes: [] },
    },
    {
      model: Subjects,
      as: 'subjects',
      where: {},
      through: { attributes: [] },
    },
    {
      model: Languages,
      as: 'languages',
      where: {},
      through: { attributes: [] },
    },
    {
      model: Formats,
      as: 'formats',
      where: {},
      attributes: ['mime_type', 'url'],
    },
  ],
  limit: 25,
  distinct: true,
  where: {},
  order: [['download_count', 'DESC NULLS LAST']],
});


/**
 * @description
 *  - this function is the child function used to build nested filter for
 *    main filter function name - `buildFilter`. Build filtes passes down
 *    the child nested object filter to be update and with correct params
 *    the main filter object is built.
 *
 *    A sample of the filter Object can be found above in the `getQueryFilter`
 *    function. This function is mostly for the includes
 *
 *
 * @param {*} filter - filter passed from the user
 * @param {*} queryFilter - include filter passed from buildFilter function
 * @param {*} type - type of the search or keyword of the search
 * @param {*} key - key to which databse query is to be made
 * @param {*} operator - what kind of operator is needed eg - like, ilike, in,
 * @param {*} isInArray - is the filter just value of array to passed for SQL IN query
 * @param {*} isRegexLike - is the search of case insensetive regex type
 */
const buildIncludeFilter = (filter, queryFilter, type, key, operator, isInArray, isRegexLike) => {
  if (isInArray) {
    if (queryFilter.where && queryFilter.where[Op.or]) {
      queryFilter[Op.or].push({ [key]: { [Op.in]: filter[type] } });
    } else {
      // eslint-disable-next-line no-param-reassign
      queryFilter.where[Op.or] = [];
      queryFilter.where[Op.or].push({ [key]: { [Op.in]: filter[type] } });
    }
  } else if (isRegexLike) {
    if (queryFilter.where && queryFilter.where[Op.or]) {
      filter[type].forEach((text) => {
        queryFilter.where[Op.or].push({ [key]: { [Op[operator]]: `${text}%` } });
      });
    } else {
      // eslint-disable-next-line no-param-reassign
      queryFilter.where[Op.or] = [];
      filter[type].forEach((text) => {
        queryFilter.where[Op.or].push({ [key]: { [Op.iLike]: `${text}%` } });
      });
    }
  }
};


/**
 * @description
 *  - this function builds the main filter object which is to be
 *    passed to the SQL query. Based on the variour types of search
 *    allowed, this function create valid set of SQL queries for the
 *    search to return accurate results.
 *
 *
 * @param {*} filter - main filter object passed from API request
 * @param {*} queryFilter - the SQL query filter wrapper for making query
 */
const buildFilter = (filter, queryFilter) => {
  const filterCopy = { ...queryFilter };
  if (filter.ids) {
    if (filterCopy.where && filterCopy.where[Op.or]) {
      filterCopy[Op.or].push({ id: { [Op.in]: filter.ids } });
    } else {
      filterCopy.where[Op.or] = [];
      filterCopy.where[Op.or].push({ id: { [Op.in]: filter.ids } });
    }
  }

  if (filter.search || filter.title) {
    if (filterCopy.where && filterCopy.where[Op.or]) {
      filter.search.forEach((text) => {
        filterCopy.where[Op.or].push({ title: { [Op.iLike]: `${text}%` } });
      });
      if (!filter.title) {
        buildIncludeFilter(filter, filterCopy.include[0], 'search', 'name', 'iLike', false, true);
      }
    } else {
      filterCopy.where[Op.or] = [];
      filter.search.forEach((text) => {
        filterCopy.where[Op.or].push({ title: { [Op.iLike]: `${text}%` } });
      });
      if (!filter.title) {
        buildIncludeFilter(filter, filterCopy.include[0], 'search', 'name', 'iLike', false, true);
      }
    }
  }

  if (filter.languages) {
    buildIncludeFilter(filter, filterCopy.include[3], 'languages', 'code', 'in', true, false);
  }

  if (filter.topic) {
    buildIncludeFilter(filter, filterCopy.include[1], 'topic', 'name', 'iLike', false, true);
    buildIncludeFilter(filter, filterCopy.include[2], 'topic', 'name', 'iLike', false, true);
  }

  if (filter.author) {
    buildIncludeFilter(filter, filterCopy.include[0], 'author', 'name', 'iLike', false, true);
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

  /**
   * @description - The find controller function which does all the
   * searching and sorting of the API request.
   *
   * @param {*} filter
   */
  async find(filter) {
    try {
      await this.paramsFilter.validateAsync(filter);
      const filterGen = this.buildFilter(filter, getQueryFilter());

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
