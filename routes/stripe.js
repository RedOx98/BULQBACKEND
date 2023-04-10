const router = require("express").Router();
const stripe = require("stripe")("sk_test_51LCbxwD30CaerxYv6VGNmHfNgeVZ0o4cJoJ7JPXyk2m77us4YtrqPYaZAXnJnCUuspLSgwrP89pjXKiJX4dOcsI100t7bQOXYx");

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    });
})

module.exports = router;