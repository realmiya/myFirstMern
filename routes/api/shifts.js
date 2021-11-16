const express = require('express')
const router = express.Router();
const axios = require("axios")
router.get("/", async (req, res) => {
    try{
        const shifts = await axios.get('http://localhost:5001/shift');
        // console.log(shifts.data)
        res.status(200).json(shifts.data)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})
    
module.exports = router 