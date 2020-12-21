const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
const bcryptService = require('../services/bcrypt.service');


const hooks = {
	beforeCreate(user) {
		user.hash_password = bcryptService().password(user); // eslint-disable-line no-param-reassign
	},
};
const tableName = 'users';

const User = sequelize.define('User', {
	fullname: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false

	},
	hash_password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phone_number: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	role: {
		type: Sequelize.STRING,
		allowNull: false
	},

}, {
	hooks,
	tableName
});

// eslint-disable-next-line
User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.hash_password;
        delete values.role;

        return values;
};

module.exports = User;
