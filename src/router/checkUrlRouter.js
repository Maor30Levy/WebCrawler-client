const express = require('express');
const router = new express.Router();
const axios = require('axios');



router.post('/check-url', async (req,res)=>{
    try{
        const url = req.body.url
        const result = await axios.get(url);
        res.sendStatus(result.status);

    }catch(err){
        console.log(err.message);
        if(err.response?.status){
            return res.sendStatus(err.response?.status);
        }else res.sendStatus(500);
        
        
    }
});


module.exports = router;