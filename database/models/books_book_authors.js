/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('books_book_authors', {
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
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books_author',
        key: 'id',
      },
    },
  }, {
    tableName: 'books_book_authors',
    timestamps: false,
  });
};
