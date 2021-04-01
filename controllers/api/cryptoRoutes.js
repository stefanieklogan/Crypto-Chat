const router = require('express').Router();
const fetch = require("node-fetch");
require("dotenv").config();
const fs = require('fs');
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
                for(i=0; i<3; i++){ // only want to display some
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
                            console.log(arr),
                            fs.writeFile('arr.json', arr.join(','), 'utf-8', function (err) {
                                if (err) return console.log(err);
                                console.log('works');
                                }
                            ) //getArray();
                            //WORKS BUT CANT BE IN LOOP?
                             // each iteration of arr, completed at end. extract completed array
                            // to hand to function below. issue- arr with proper value only exists here. 
                        })
                }; getArray()
            })
const getArray = () => {
    fs.readFile("arr.json", 'utf-8',function(err, data) {
        if (err) throw err;     
        const arr = data;
        console.log("getarray",data); 
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + arr + "&tsyms=USD") // this api accepts comma separated string data, place arr where "BTC" is
        .then(response => response.json())
        .then(data => {
            const stuff = data.DISPLAY;
            const manipulated = Object.entries(stuff).reduce((acc,el) => { // this fn turns api res into arr of objects
                Object.entries(el[1]).forEach((stuff) => {
                    stuff[1].SYM = el[0]
                    acc.push(stuff[1])
                })
                return acc;
            },[]) 
            console.log(manipulated) // the array of objects to finally display in HB
            res.render('coinBar', manipulated)
            }
        )
        });
    };
});

module.exports = router;