const User = require('../models/users');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

//implement sign up function//

exports.signup = (req, res, next) => {   
    bcrypt.hash(req.body.password, 10).then(   
        (hash) => {                               
            const user = new User({
                email:req.body.email,
                password: hash
            });
            user.save().then(                        
                () => {
                    res.status(201).json({           
                        message: "User added sucessfully!"
                    });
                }
            ).catch (
            (error) => {
                res.status(500).json({  
                    error: error         //server error//

                });
            }
            )
        }
    )

};

//implement login function//

exports.login = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email}).then(
        (user)  => {
            if (!user) {                            //if user does not exist send it back to front end//
                return res.status(401).json({            
                    error: new Error('User not found!')
                });     

            }
            //if exist check the user password - compare hashes//
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    const token = jwt.sign({userId: user._id}, 
                        'SecretKey',     
                        { expiresIn:'24h' });
                    res.status(200).json({         
                        userId:user._id,
                        token: token         
                    });
                }
            ).catch(
               (error) => {
                   res.status(500).json({
                       error: error
                   });
               }                     
            );
        }
        //if mongoose goes wrong
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );

}
