const express = require('express');
const router = express.Router();
const axios = require("axios")
//@route Post api/users




router.get("/", async (req, res) => {
    try{
        const users = await axios.get('http://localhost:5001/user');
        res.status(200).json(users.data)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');


    }

})
module.exports = router


