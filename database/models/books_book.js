/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    download_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gutenberg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'books_book',
    timestamps: false,
  });

  Books.associate = function (models) {
    Books.belongsToMany(models.Author, {
      foreignKey: 'book_id',
      as: 'authors',
      through: 'books_book_authors',
    });

    Books.belongsToMany(models.BookShelves, {
      foreignKey: 'book_id',
      as: 'bookshelves',
      through: 'books_book_bookshelves',
    });

    Books.belongsToMany(models.Languages, {
      foreignKey: 'book_id',
      as: 'languages',
      through: 'books_book_languages',
    });

    Books.belongsToMany(models.Subjects, {
      foreignKey: 'book_id',
      as: 'subjects',
      through: 'books_book_subjects',
    });

    Books.hasMany(models.Formats, {
      foreignKey: 'book_id',
      as: 'formats',
    });
  };
  return Books;
};
