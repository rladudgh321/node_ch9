const { hash } = require('bcrypt');
const Hashtag = require('../models/hashtag');
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

exports.renderHashtag = async(req,res,next)=>{
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');
    }
    try{
        const hashtag = await Hashtag.findOne({where:{title:query}});
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({ include:[{
                model:User,
                attributes:['id','nick'],
            }],
            order:[['createdAt', 'DESC']],
        })}
        return res.render('main',{
            title: `${query} | nodebird`,
            twits: posts,
        });
    } catch (err){
        console.error(err);
        next(err);
    }
}