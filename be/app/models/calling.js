const Sequelize = require('sequelize');
const sequelize = require('../../config/db');

const tableName = 'audio_features';

const Calling = sequelize.define('af', {
    created_at: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sdate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.FLOAT,
        unique: true,
        allowNull: false

    },
    total_speech_duration: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
    tableName
});


module.exports = Calling;
