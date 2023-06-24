const passport = require('passport');
const { Strategy : kakaoStrategy} = require('passport-kakao');
const User = require('../models/user');

module.exports = ()=>{
    passport.use(new kakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL:'/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done)=>{
        console.log("kakao profile", profile);
        try{
            const exUser = await User.findOne({where:{snsId:profile.id, provider:'kakao'}});
            if(exUser){
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    snsId:profile.id,
                    provider:'kakao',
                    nick:profile.displayName,
                    email:profile?._json?.kakao_account?.email,
                });
                done(null, newUser);
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
        
    }))
}