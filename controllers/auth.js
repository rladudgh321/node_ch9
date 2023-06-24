const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async(req,res,next) =>{
    const { email, password, nick } = req.body;
    try {
        const user = await User.findOne({where:{email}});
        if(user){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password:hash,
        });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

exports.login = (req,res,next) =>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            next(authError);
        }
        if(!user){
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, loginError=>{
            if(loginError){
                console.error(loginError);
                next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
}

exports.logout = (req,res,next) =>{
    req.logout(()=>{
        res.redirect('/');
    })
}