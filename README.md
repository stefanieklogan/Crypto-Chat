# :chart: Crypto Chat :speech_balloon:

Crypto currency has grown exponentially in the last few years and this application allows users to come together and connect with others. This application fills the void of what's missing today - an simple spot to communicate with other crypto currency fans. A fan can be someone new to this world or a long-time online investor. 

<a name="application"></a>
## Deployed :link:
[Crypto Chat](https://radiant-depths-82308.herokuapp.com/)

## Dependencies & Technology :computer:
[CryptoCompare API](https://min-api.cryptocompare.com/) 

[CoinPaprika API](https://api.coinpaprika.com/) 

<img src="https://img.shields.io/badge/node_JS%20-%231572B6.svg?&style=for-the-badge&logo=nodeJS3&logoColor=white"/><img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>

* Check the package.json file - this application has several dependencies including mySQL2, express, sequelize and more.

* This application uses two APIs: Coin Paprika & Crypto Compare. Request your API keys & added to local .env file. 

## Installation

* After cloning this repository, run following command for dependencies. 
```md
npm install
```
* Create a '.env' file with your MySQL username & password. DB name listed below.
```md
DB_NAME=cryptoChat_db
```
* Schema and seeds files are available and should be executed prior to application use via
```md
npm run seed
```
Look for 'cryptochat_db' and three tables (user/comment/post) to verify files successfully ran.

* To run the application, enter the following command  inside terminal. 
```md
node server
```

## Crypto Chat code squad :technologist:

* Stefanie Logan

* Raquel Scofield

* Marisa NeSmith