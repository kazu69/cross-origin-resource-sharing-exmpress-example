'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();

var serverOptions = {
    key: _fs2.default.readFileSync('./keys/server.key'),
    cert: _fs2.default.readFileSync('./keys/server.cert'),
    requestCert: false,
    rejectUnauthorized: false
};

var server = _https2.default.createServer(serverOptions, app);

var sess = {
    secret: 'mysecret',
    cookie: {}
};
var accessLogStream = _fs2.default.createWriteStream(_path2.default.join('log', 'access.log'), { flags: 'a' });

// cros setting
var ALLOWED_ORIGINS = ['https://127.0.0.1:3000', 'https://127.0.0.1:3001'];

var ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

var ROUTES = ['/', '/cros/', '/no-cros/', '/cros-with-credentials/'];

var MAX_AGE = '86400';

app.use((0, _morgan2.default)('combined', { stream: accessLogStream }));

app.use(_express2.default.static(__dirname + '/../public'));
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/views');
app.set('trust proxy', 1);

app.use((0, _expressSession2.default)(sess));

app.use(function (req, res, next) {
    var origin = req.headers.origin;
    if (req.url != '/' && req.url != '/no-cros/' && ALLOWED_ORIGINS.indexOf(origin) > -1) {
        sess.cookie.secure = true;
        res.cookie('example', Math.random().toString(), { maxAge: 86400, httpOnly: true });
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

app.options('*', function (req, res) {
    res.sendStatus(200);
});

// routes
app.get(ROUTES, function (req, res) {
    res.render('index', { title: 'access to ' + req.url });
});

server.listen(port);