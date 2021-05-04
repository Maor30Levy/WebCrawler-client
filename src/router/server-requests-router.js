const express = require('express');
const router = new express.Router();
const axios = require('axios');
const { keys } = require('../keys/keys');

router.post('/server', async (req, res) => {
    try {
        const serverURL = `http://${keys.serverHost}:${keys.serverPort}/${req.body.route}`;
        const request = req.body.request;
        const result = await axios.post(serverURL, request);
        return res.send(result.data)
    } catch (err) {
        console.log(err.message);
        if (err.response?.status) {
            return res.sendStatus(err.response?.status);
        } else return res.sendStatus(500);
    }
});


module.exports = router;