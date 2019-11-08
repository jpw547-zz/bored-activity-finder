const express = require('express');
const router = express.Router();
const axios = require('axios');

const BORED_URL = "http://www.boredapi.com/api";

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/activity', function(req, res) {
    const url = BORED_URL + req.url;
    axios.get(url).then(response => {
        res.send(response.data);
    });
});

module.exports = router;