module.exports = (sequelize, DataTypes) => {
    const LogHistory = sequelize.define('LogHistory', {
      AccountID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Accounts',
          key: 'id',
        },
        allowNull: false,
      },
      LastLoginDate: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {});
  
    LogHistory.associate = function(models) {
      LogHistory.belongsTo(models.Account, { foreignKey: 'AccountID', as: 'account' });
    };
  
    return LogHistory;
  };
  