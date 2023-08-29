const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: '.variables.env' });
const { io, server, app, express } = require('./config/socketIo')
require('./config/db')
const { isValidAdminToken } = require('./controllers/erpControllers/authJwtController');
const orderRouter = require('./controllers/erpControllers/socketIoController')

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
})

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", isValidAdminToken, apiLimiter, orderRouter);

app.set('port', process.env.PORT_SOCKET_IO || 5000);
server.listen(app.get('port'), () => {
    console.log(`Socket app running → On PORT : ${server.address().port}`);
});