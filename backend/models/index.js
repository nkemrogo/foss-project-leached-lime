const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const User = require('./User')(sequelize, DataTypes);
const Complaint = require('./Complaint')(sequelize, DataTypes);

User.hasMany(Complaint, { foreignKey: 'UserId' });
Complaint.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { sequelize, User, Complaint };