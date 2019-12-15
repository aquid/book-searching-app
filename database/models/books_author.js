/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Author = sequelize.define('Author', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    birth_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    death_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'books_author',
    timestamps: false,
  });

  Author.associate = function (models) {
    Author.belongsToMany(models.Books, {
      foreignKey: 'author_id',
      as: 'books',
      through: 'books_book_authors',
    });
  };
  return Author;
};
