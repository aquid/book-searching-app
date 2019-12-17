/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Languages = sequelize.define('Languages', {
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
    timestamps: false,
  });

  Languages.associate = function (models) {
    Languages.belongsToMany(models.Books, {
      foreignKey: 'language_id',
      as: 'books',
      through: 'books_book_languages',
    });
  };

  return Languages;
};
