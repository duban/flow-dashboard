/** third party */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

/** server conf */
const config = require('./config');
const auth = require('./app/policies/auth.policy');

// env config
const environment = process.env.NODE_ENV;

/** express app */
const app = express();
const server = http.Server(app);
// const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'app/controllers/');

// Cors config
app.use(cors());

// Pake helm
app.use(helmet({
        dnsPrefetchControl: false,
        frameguard: false,
        ieNoOpen: false,
}));

// Request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.all('/api/v1/*', (req, res, next) => auth(req, res, next) );

app.all('/api/v1/*');



app.use('/api/v1', mappedAuthRoutes);


const conn = server.listen(config.port, () => {
        if (environment !== 'production' &&
        environment !== 'development' &&
        environment !== 'testing'
) {
        console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
        process.exit(1);
}
});

process.on('SIGTERM', () => {
        conn.close(() => {
                console.log('Process terminated')
        })
})
