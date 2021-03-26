const router = require('express').Router();
const fetch = require("node-fetch");
require("dotenv").config();

// data doesn't need to be saved to db-?
//model
//need to display- jquery/handlebars
// WORKING TO RETURN ALL API DATA(log), will take too long to load in insomnia. Working on returning pinpointed data following MVC paradigm.
router.get("/", async (req, res) => {
        fetch("https://coinpaprika1.p.rapidapi.com/coins", {
            "headers": {
                "x-rapidapi-key": process.env.CP_API_KEY,
                "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
            }
        }).then(response => response.json()).then(data => console.log(data));
})
module.exports = router;