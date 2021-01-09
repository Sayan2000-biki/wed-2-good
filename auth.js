
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {

    
    const data = req.body;
    console.log(data);
    // res.send("data received");

    const user = new User(data);

    user.save((err, user) => {

        if(err){

            return res.status(400).json({
                err: "Not able to Save user in DB"
            })
        }
        else{
           return res.json({

                name : user.name,
                email: user.email,
                _id : user._id
            });

        // res.sendFile(__dirname +"/sucess_signup.html");
        }
    })
};


exports.signin = (req, res) => {

   const {email, password} = req.body;

    //server side Validation code



    User.findOne({email}, (err, user) => {

        if(err || !user){
            return res.json({
                msg : "user mail doesn't exists"
            })
        //    return res.sendFile(__dirname +"/failure.html");

        };

        if(!user.authenticate(password)){
            

            return res.json({
                msg : "user password doesn't exists"
            })

        //    return res.sendFile(__dirname +"/failure_password.html");
        };

        // return res.json({

        //     msg : "user sign in sucesssfully"
        // });

        
    //    return res.sendFile(__dirname +"/sucess_signin.html");

         //create Token
         const token = jwt.sign({_id:user._id}, process.env.SECRET)

         //put token into the cookie
         res.cookie("token", token, {expire:new Date()+ 9999});
 
         //send response to the front-end
 
         const {_id, name, email,role} = user;
         return res.json({
             token, 
             user:{_id,name,email,role}
         })

       
    })

}




exports.signout = (req,res) => {
    res.clearCookie("token")

    res.json({
        msg:"user signout"
    });
}


//Protected routes

exports.isSignedIn = expressJwt({

    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['RS256']
  })        




//Custom middleware

exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "Acesss Denied"
        })
    }

    next();
}

exports.isAdmin = (req, res,next) =>{

    if(req.profile.role === 0){
        return res.status(403).json({

            err: "You are not an admin"
        })
    }

    next();
}
 