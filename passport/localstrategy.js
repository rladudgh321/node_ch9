const passport = require('passport');
const {Strategy : localStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = ()=>{
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordfield: 'password',
        passReqToCallback: false,
    }, async(email,password,done)=>{
        try{
            const exUser = await User.findOne({where:{email}});
            if(exUser){
                const result = bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                } else {
                    done(null, false, {message:'비밀번호가 틀립니다'});
                }
            } else {
                done(null, false, {message:'이메일이 등록되어 있지 않습니다'});
            }
        } catch (err){
            console.error(err);
            done(err);
        }
    }));
}