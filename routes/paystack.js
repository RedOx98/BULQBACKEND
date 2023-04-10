const router = require("express").Router();
const paystack = require("paystack")("sk_test_28ef93a1b82a6b3cfeb11b9de1e5c6de177fb8dd");

router.post("/payments", (req, res) => {
    paystack.transaction.charge({
        source:req.body.reference,
        amount:req.body.amount,
        currency:"ngn",
    }, (paystackErr, paystackRes)=>{
        if(paystackErr){
            res.status(500).json(paystackErr);
        }else{
            res.status(200).json(paystackRes);
        }
    });
})

module.exports = router;