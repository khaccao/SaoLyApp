module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        RegistrationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        Otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Account;
};
