const Post = require('../models/post');
const User = require('../models/user');
exports.renderJoin = (req,res,next)=>{
    res.render('join', {title: 'join'});

}
exports.renderProfile = (req,res,next)=>{
    res.render('profile', {title: 'profile'});
    
}
exports.renderMain = async(req, res, next)=>{
    try {
        const posts = await Post.findAll({
            include:{
                model:User,
                attributes:['id', 'nick'],
            },
            order:[['createdAt', 'DESC']],
        })
        res.render('main', {
            twits:posts,
            title:'main'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
