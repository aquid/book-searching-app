/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('books_language', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'books_language',
  });
};
