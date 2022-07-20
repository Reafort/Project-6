const sauces = require('../models/sauces');
const fs = require('fs');

//get all sauces//
exports.getAllSauces = (req,res,next) =>{
    console.log('hello from sauces');
    sauces.find().then(
        (result) => {
            res.status(200).json(result);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error:error
            });
        }
    );
};

//get sauce by ID

exports.getOneSauces = (req,res,) =>{
    console.log('Test ID sauces');
    sauces.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error)=> {
            res.status(404).json({
                error:error
            });
        }
    );
};

//create sauces

/*jshint esversion: 6 */

exports.createSauces = (req,res,next) => {
    console.log("test", req.body);
    let body = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    

const sauce= new sauces({
    userId:body.userId,
    name:body.name,
    manufacturer: body.manufacturer,
    description:body.description,
    heat:body.heat,
    likes: 0,
    dislikes: 0,
    imageUrl: url + '/images/' + req.file.filename,
    mainPepper:body.mainPepper,
    usersLiked: [],
    usersDisliked: [],
    
  });
   console.log('sauce', sauce);
  sauce.save().then(
      () => {
          res.status(201).json({
              message:'New sauce has been added to database successfully!'
          });
      }
  ).catch(
      (error)=> {
          res.status(500).json({
              message:error
          });
      }
  );
   };

   //Modify sauce
exports.modifySauces = (req,res,next) => {
    let sauce = new sauces({_id: req.params.id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            _id:req.params.id,
            userId:req.body.userId,
            name:req.body.name,
            manufacturer: req.body.manufacturer,
            description:req.body.description,
            heat:req.body.heat,
            likes: 0,
            dislikes: 0,
            imageUrl: url + '/images/' + req.file.filename,
            mainPepper:req.body.mainPepper,
            usersLiked: [],
            usersDisliked: [],
        };
    }else {
        sauce = {
            _id:req.params.id,
            userId:req.body.userId,
            name:req.body.name,
            manufacturer:req.body.manufacturer,
            description:req.body.description,
            mainPepper:req.body.mainPepper,
            heat:req.body.heat,   
        };
    }

    sauces.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({ message: "Sauce updated successfully!" });
        })
        .catch((error) => {
            res.status(404).json({ error:error});
        });
     };

     //delete sauce

     exports.deleteSauces = (req,res,next) => {
         sauces.findOne({_id: req.params.id}).then(
             //
             (sauce) => {
                 const filename = sauce.imageUrl.split('/images/')[1]
                 fs.unlink('images/' + filename, () => {
                     sauces.deleteOne({_id: req.params.id}).then(
                         () => {
                             res.status(200).json({
                                 message: 'Deleted!'
                             });
                         }
                     ).catch(
                         (error) => {
                             res.status(400).json({
                                 error:error
                             });
                         }
                     );
                 });
             }
         )
     };

//Like sauce
exports.likeSauces = (req,res,next) => {
    console.log('Test LIKE');
    sauces.findOne({_id: req.params.id}).then(
        (sauce) => {
            if (req.body.like == 1) {
                if(sauce.usersLiked.includes(req.body.userId)){
                        let userindex = sauce.usersLiked.indexOf(req.body.userId)
                        sauce.usersLiked.splice(userindex,1)
                        sauce.likes = sauce.usersLiked.length
                }else{
                     sauce.usersLiked.push(req.body.userId)
                     sauce.likes = sauce.usersLiked.length
                }
               
            }

        //dislike sauce
        else if (req.body.like == -1) {
            if(sauce.usersDisliked.includes(req.body.userId)){
                let userindex = sauce.usersDisliked.indexOf(req.body.userId)
                sauce.usersDisliked.splice(userindex,1)
                sauce.dislikes = sauce.usersDisliked.length
        }else{
             sauce.usersDisliked.push(req.body.userId)
             sauce.dislikes = sauce.usersDisliked.length
        }
        }
        else{
            if(sauce.usersDisliked.includes(req.body.userId)){
                let userindex = sauce.usersDisliked.indexOf(req.body.userId)
                sauce.usersDisliked.splice(userindex,1)
                sauce.dislikes = sauce.usersDisliked.length
        }  else{
            if(sauce.usersLiked.includes(req.body.userId)){
                let userindex = sauce.usersLiked.indexOf(req.body.userId)
                sauce.usersLiked.splice(userindex,1)
                sauce.likes = sauce.usersLiked.length
             }
        } 
        }

        sauce.save().then(
            () => {
                res.status(200).json({
                    message: "Sauce Like Updated!"
                });
            }
        )
     });
 }
