const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.variables.env' });
const { io, server, app, express } = require('./config/socketIo')
require('./config/db')
const { isValidAdminToken } = require('./controllers/erpControllers/authJwtController');
const orderRouter = require('./controllers/erpControllers/socketIoController')

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

app.use("/orders", isValidAdminToken, orderRouter);

app.set('port', process.env.PORT_SOCKET_IO || 5000);
server.listen(app.get('port'), () => {
    console.log(`Socket app running → On PORT : ${server.address().port}`);
});