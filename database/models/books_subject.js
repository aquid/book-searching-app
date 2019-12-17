/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Subjects = sequelize.define('Subjects', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'books_subject',
    timestamps: false,
  });

  Subjects.associate = function (models) {
    Subjects.belongsToMany(models.Books, {
      foreignKey: 'subject_id',
      as: 'books',
      through: 'books_book_subjects',
    });
  };

  return Subjects;
};
