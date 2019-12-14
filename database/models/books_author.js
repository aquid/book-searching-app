/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('books_author', {
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
  });
};
