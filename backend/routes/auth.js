const router = require('express').Router();
const User = require("../models/User")
const Crypto = require("crypto-js")
const jwt = require("jsonwebtoken")
// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // CryptoJS with AES hash algorithm to encrypt pass (ex: 123 -> 3ht1h4gz@)
        password: Crypto.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
    })
    try{
         // save user to DB
// save any doc or update/delete from db -> waste time (ms -> s)
// -> no chance to exact time -> promise async await
        const savedUser = await newUser.save()
        // send to client side
        res.status(200).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try{
        // findOne method from User (unique username)
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong username");
        // decrypt pass (ex: 3ht1h4gz@ -> 123)
        const hashedPassword = Crypto.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
        const originPassword = hashedPassword.toString(Crypto.enc.Utf8);
        originPassword !== req.body.password && res.status(401).json("Wrong password");
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {expiresIn: "3d"}
        )
        // return user response but dont want see password
        // -> destructure user => pass + other info 
        // mongodb store doc prevent: -> user._doc 
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);

    }
})

module.exports = router