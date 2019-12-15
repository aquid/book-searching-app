/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Formats = sequelize.define('Formats', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books_book',
        key: 'id',
      },
    },
  }, {
    tableName: 'books_format',
    timestamps: false,
  });

  Formats.associate = function (models) {
    Formats.belongsTo(models.Books, {
      foreignKey: 'book_id',
      as: 'books',
    });
  };

  return Formats;
};
