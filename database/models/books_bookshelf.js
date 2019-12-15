/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const BookShelves = sequelize.define('BookShelves', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'books_bookshelf',
    timestamps: false,
  });

  BookShelves.associate = function (models) {
    BookShelves.belongsToMany(models.Books, {
      foreignKey: 'bookshelf_id',
      as: 'books',
      through: 'books_book_bookshelves',
    });
  };

  return BookShelves;
};
