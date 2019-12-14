/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('books_book', {
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
};
