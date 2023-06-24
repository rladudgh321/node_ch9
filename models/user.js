const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull:false,
                unique:true,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            snsId:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            provider:{
                type:Sequelize.ENUM('local', 'kakao'),
                allowNull:false,
                defaultValue:'local',
            },
            nick:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, { as:'Followings', through:'Follow', foreignKey: 'followerId' });
        db.User.belongsToMany(db.User, { as:'Followers', through:'Follow', foreignKey:'followingId'});
    }
}

module.exports = User;