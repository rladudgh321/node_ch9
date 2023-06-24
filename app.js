const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const app = express();
dotenv.config();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views',{
    express: app,
    watch: true,
});

const { sequelize } = require('./models');
sequelize.sync({force:false})
    .then(()=>{
        console.log('DB연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    })


    

app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
const passport = require('passport');
const passportConfig = require('./passport');
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
app.use('/', pageRouter);
app.use('/auth', authRouter);

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url}에서 라우터를 찾을 수 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status||500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버 대기중');
});