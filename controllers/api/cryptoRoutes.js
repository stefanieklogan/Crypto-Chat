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
        console.log("getarray",data); // Print users 
        fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + arr + "&tsyms=USD") // this api accepts comma separated string data, place arr where "BTC" is
        .then(response => response.json())
        .then(data => {
            const stuff = data.DISPLAY;
            const manipulated = Object.entries(stuff).reduce((acc,el) => {
                Object.entries(el[1]).forEach((stuff) => {
                    stuff[1].SYM = el[0]
                    acc.push(stuff[1])
                })
                return acc;
            },[])
            console.log(manipulated)
            res.render('coinBar', manipulated)
            }
        )
        });
    };
});
// const getData = (sym) =>{
//     for(i = 0; i < arr.length; i++){
//         data.DISPLAY[sym].USD
//     }
// }
// console.log(data.DISPLAY.BTC.USD)
 // for(i = 0; arr.length; i++){
            //     getObj();
            // }
        
            // fs.writeFile('arr.json', data.join(','), 'utf-8', function (err) {
            //     if (err) return console.log(err);
            //     console.log('works');
            //     }
                //include fn in script file on HB page then write from that 

                // function getFromSym(sym){
                //     for(i=0; i<arr.length; i++){
                //         var arrItem = data.DISPLAY.sym.USD
//not working, write to json file to briong into hB?
            // instead of console.log, set .0 to given symbol data how
            //take same arr and map here for each iteration of 0
            //need to push to array first? dont overwrite value
// const getObj = (sym) => {
//     const obj = data.DISPLAY.[sym].USD

// }
// open ai gpt-3
        // res.render('coinBar', {
        //    item1: data.DISPLAY[0].USD,
        //    item2: data.DISPLAY[1].USD
        // })
            //this data needs to be pulled for each item in arr
            //return data for each as an array of objects and generate element for each object in the array in HB
            // data.DISPLAY.BTC.USD.IMAGEURL,
            // data.DISPLAY.BTC.USD.PRICE,
            // data.DISPLAY.BTC.USD.CHANGEPCT24HOUR
module.exports = router;