const express = require('express')
const router = express.Router();
const axios = require("axios")
router.get("/", async (req, res) => {
    try{
        const hospitals = await axios.get('http://localhost:5001/hospital');
        console.log(hospitals);
        res.status(200).json(hospitals.data)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server for hospital Error');


    }

})
module.exports = router 