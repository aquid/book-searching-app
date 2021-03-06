/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('books_book_bookshelves', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books_book',
        key: 'id',
      },
      unique: true,
    },
    bookshelf_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books_bookshelf',
        key: 'id',
      },
    },
  }, {
    tableName: 'books_book_bookshelves',
    timestamps: false,
  });
};
