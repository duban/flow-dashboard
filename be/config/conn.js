const development = {
        database: 'vtt_db',
        username: 'admin',
        password: '53dFn0IDIa',
        host: 'data-capturer-new.c99fzv6zeses.ap-southeast-1.rds.amazonaws.com',
        dialect: 'mysql',
};

const testing = {
        database: 'peers_db',
        username: 'root',
        password: 'root12345',
        host: '127.0.0.1',
        dialect: 'mysql',
};

const production = {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'sqlite' || 'mysql' || 'postgres',
};

module.exports = {
        development,
        testing,
        production,
};
