require ('dotenv').config()


const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host: process.env.DB_HOST,
    dialect: 'postgres'
}
);

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING
    }
})
/**
 * One to One Rel
 * Foo.hasOne(Bar);
Bar.belongsTo(Foo);
 
 */

const Profile = sequelize.define("Profile", {
    birthday: {
        type: DataTypes.DATE
    }
})

User.hasOne(Profile, {
    onDelete: "CASCADE"
});
Profile.belongsTo(User);
/**
 * One to Many
 * Team.hasMany(Player);
Player.belongsTo(Team);
 */
 const Order = sequelize.define("Order", {
    shipDate: {
        type: DataTypes.DATE
    }
})

User.hasMany(Order);
Order.belongsTo(User);


/**
 * Many to Many
 * const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
 */
const Class = sequelize.define("Class", {
    className: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE
    }
})

User.belongsToMany(Class, { through: "Users_Classes"})
Class.belongsToMany(User, {through: "Users_Classes"})

;(async () => {
   await sequelize.sync({force: true});

   let my_user = await User.create({ username: 'Ryan'})
   let my_profile = await Profile.create({birthday: new Date() })
    console.log(await my_user.getProfile())
   await my_user.setProfile(my_profile)
   console.log( await my_user.getProfile())

   let resultUser = await User.findOne({
       where: {
           id: 1
       }
   })
        console.log(await resultUser.getProfile())
})();