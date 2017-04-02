import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import https from 'https';

const port = process.env.PORT || 3000;
const app = express();

const serverOptions = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.cert'),
    requestCert: false,
    rejectUnauthorized: false
};

const server = https.createServer(serverOptions, app);

const sess = {
    secret: 'mysecret',
    cookie: {}
}
const accessLogStream = fs.createWriteStream(path.join('log', 'access.log'), {flags: 'a'});

// cros setting
const ALLOWED_ORIGINS = [
    'https://127.0.0.1:3000',
    'https://127.0.0.1:3001'
];

const ALLOWED_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS'
];

const ROUTES = [
     '/',
     '/cros/',
     '/no-cros/',
     '/cros-with-credentials/'
];

const MAX_AGE = '86400';

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static(__dirname + '/../public'));
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/views');
app.set('trust proxy', 1);

app.use(session(sess));

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (req.url != '/' && req.url != '/no-cros/' && ALLOWED_ORIGINS.indexOf(origin) > -1) {
        sess.cookie.secure = true;
        res.cookie('example', Math.random().toString(), {maxAge: 86400, httpOnly: true});
        // res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS.join(','));
        res.setHeader('Access-Control-Max-Age', MAX_AGE);
        res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
        if (req.url.indexOf('/cros-with-credentials/') > -1) {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
    }

    next();
});

app.options('*', (req, res) => {
    res.sendStatus(200);
});

// routes
app.get(ROUTES, (req, res) => {
    res.render('index', {title: `access to ${req.url}`});
});

server.listen(port);
