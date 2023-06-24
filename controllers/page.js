exports.renderJoin = (req,res,next)=>{
    res.render('join', {title: 'join'});

}
exports.renderProfile = (req,res,next)=>{
    res.render('profile', {title: 'profile'});
    
}
exports.renderMain = (req,res,next)=>{
    const twits = [];
    res.render('main', {
        twits,
        title:'main'
    });
}
