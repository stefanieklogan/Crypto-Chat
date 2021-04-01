const router = require('express').Router();
const fetch = require("node-fetch");
require("dotenv").config();
const fs = require('fs');
var arr = [];

// this route is to retrieve coin data for display in views/coinBar.HB

router.get("/", async (req, res) => {
    fetch("https://coinpaprika1.p.rapidapi.com/coins/", //ranked coins
        {
            "headers": {
                "x-rapidapi-key": process.env.CP_API_KEY,
                "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
            }
        }).then(res => res.json())
            .then(data => { // all coin metadata returned (in order)
                for(i=0; i<2; i++){ // only want to display some
                    fetch("https://coinpaprika1.p.rapidapi.com/coins/" + data[i].id, // grabs one coin id from metadata
                    {
                        "headers": {
                        "x-rapidapi-key": process.env.CP_API_KEY,
                        "x-rapidapi-host": "coinpaprika1.p.rapidapi.com"
                        }
                    }).then(res => res.json()) 
                        .then(data => { // 1 coin metadata by id
                            var sym = (data.symbol); // 1 symbol saved into sym since dot notation was confusing .push
                            arr.push(sym), // push 1 symbol into array
                            fs.writeFile('arr.json', arr.join(','), 'utf-8', function (err) {
                                if (err) return console.log(err);
                                console.log('works');
                                }
                            ) 
                        })
                }; getArray()
            })
const getArray = () => {
    fs.readFile("arr.json", 'utf-8',function(err, data) {
        if (err) throw err;     
        const arr = data;
        console.log("array from arr.json", arr); 
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + arr + "&tsyms=USD") // full data for several coins
        .then(response => response.json())
        .then(data => {
            const display = data.DISPLAY; // api res for display
            const manipulated = Object.entries(display).reduce((acc,el) => { // this fn turns api res into arr of objects
                Object.entries(el[1]).forEach((display) => {
                    display[1].SYM = el[0]
                    acc.push(display[1])
                })
                return acc;
            },[]) 
            console.log(manipulated) // the array of objects to finally display in HB, WORKS
            res.render('coinBar', {manipulated}) // attempting to use manipulated (array) in coinBar.HB without success (yet)
            }
        )
        });
    };
});

module.exports = router;