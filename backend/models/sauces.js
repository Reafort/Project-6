const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
            
            name: {type :String ,required : true},
            manufacturer: {type :String ,required : true},
            description: {type :String ,required : true},
            heat: {type :Number ,required : true},
            likes: {type :Number ,required : true},
            dislikes: {type :Number ,required : true},
            imageUrl: {type :String ,required : true},
            mainPepper: {type :String ,required : true},
            usersLiked: {type :[String] },
            usersDisliked: {type :[String] },
            userId: {type :String ,required : true},
          });

module.exports = mongoose.model('sauces', saucesSchema);

