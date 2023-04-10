const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const { json } = require("express/lib/response");
const jwt =  require("jsonwebtoken")

//REGISTER

router.post("/register", async (req, res) => {
    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // !username && res.status(400).json("enter your username");
    // !email && res.status(400).json("enter your email");
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC
            ).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err)
    {
        res.status(500).json("something wrong")};
});

//LOGIN


router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("wrong credentials");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const pass = hashedPassword.toString(CryptoJS.enc.Utf8);

        pass !== req.body.password && res.status(401).json("wrong credentials");

        const { password, ...info } = user._doc;

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: "3d"}
        );

        res.status(200).json({...info, accessToken});
    }catch(err){
        res.status(500).json("something wrong");
    }
})

module.exports = router