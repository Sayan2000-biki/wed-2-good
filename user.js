const User = require("../models/user");

exports.getUserByID = (req, res, next, id ) => {

    User.findById(id).exec((err, user) => {

        if(err){
            return res.status(400).json({

                err: "User not found"
            })
        }

        req.profile = user;
        next();
    })

}

exports.getUser = (req, res,) => {

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt= undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
}

exports.updateUser = (req, res) => {

    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},

        (err, user) => {
            if(err) {

                res.status(400).json({

                    err: "update of the database is not possible"
                })
            }

            
             user.salt = undefined;
             user.encry_password = undefined;

            res.json(user)
        }


    )
}