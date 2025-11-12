module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    block: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    UserId: {  // ✅ Added this to fix the error
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Complaint;
};
