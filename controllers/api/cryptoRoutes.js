const router = require('express').Router();
const fetch = require("node-fetch");
require("dotenv").config();

var arr = [];

// this route is to retrieve coin data for display in views/coinBar.HB

// this route works to retrieve data and log (line 30) but doesn't display in insomnia - loading, loading...
router.get("/", async (req, res) => {
    fetch("https://coinpaprika1.p.rapidapi.com/coins/", //ranked coins
        {
            "headers": {
                "x-rapidapi-key": process.env.CP_API_KEY,
                "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
            }
        }).then(res => res.json()) // convert to json(express)
            .then(data => { // all coin metadata returned (in order)
                for(i=0; i<11; i++){ // only want to display some
                    fetch("https://coinpaprika1.p.rapidapi.com/coins/" + data[i].id, // grabs one coin id from metadata
                    {
                        "headers": {
                        "x-rapidapi-key": process.env.CP_API_KEY,
                        "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
                        }
                    }).then(res => res.json()) // convert to json
                        .then(data => { // 1 coin metadata by id
                            var sym = (data.symbol); // 1 symbol saved into sym since dot notation was confusing .push
                            arr.push(sym), // push 1 symbol into array
                            console.log(arr) // each iteration of arr, completed at end. extract completed array
                            // to hand to function below. issue- arr with proper value only exists here. 
                        })
                }
            })
});
        
fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + "BTC" + "&tsyms=USD") // this api accepts comma separated string data, place arr where "BTC" is
    .then(response => response.json())
    .then(data => //console.log
        (
        //this data needs to be pulled for each item in arr
        //return data for each as an array of objects and generate element for each object in the array in HB
        data.DISPLAY.BTC.USD.IMAGEURL,
        data.DISPLAY.BTC.USD.PRICE,
        data.DISPLAY.BTC.USD.CHANGEPCT24HOUR));
    
module.exports = router;