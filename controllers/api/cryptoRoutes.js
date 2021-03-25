const router = require('express').Router();
const fetch = require("node-fetch");
require("dotenv").config();

// data doesn't need to be saved to db-?
//model
//need to display- jquery/handlebars
router.get("/crypto", async (req, res) => {
	try {
		const response = await 
        fetch("https://coinpaprika1.p.rapidapi.com/coins", {
            "headers": {
                "x-rapidapi-key": process.env.CP_API_KEY,
                "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
            }
        })
		return res.json({
            success: true,
            response
        })
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		})
	}
})
module.exports = router;