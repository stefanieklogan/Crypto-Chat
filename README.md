# Crypto Chat

## Table of Contents
1. [ Application. ](#application)
2. [ Project Overview. ](#overview)
3. [ Dependencies & Technology. ](#depend)
4. [ Installation. ](#install)
5. [ Example code. ](#code)
6. [ Development squad. ](#squad)
7. [ The other stuff: License & Badges. ](#streetcred)


<a name="application"></a>
## Application

* Link: XXXXXXXXXXXXXXXXXXX

![Crypto Chat Homepage](./images/screenshot.png)
![Crypto Chat Login Page](./images/screenshot2.png)

<a name="overview"></a>
## Project overview

* Crypto currency has grown exponentially in the last few years and this application allows users to come together and connect with others. This application fills the void of what's missing today - an uncensored spot to communicate with other crypto currency fans. A fan can be someone new to this world or a long-time online investor. 

<a name="depend"></a>
## Dependencies & Technology

* Check the package.json file - this application has several dependencies including mySQL2, express, sequelize and more.

* This application uses two APIs: Coin Paprika & Crytop Compare. Request your API keys & added to local .env file. 

![Crypto API](./images/crypt-screenshot.png)

<a name="install"></a>

## Installation if forking repository

* After cloning this repository, run 'npm install' for dependencies. 

* Create a '.env' file with your MySQL port, username & password. DB name is cryptochat_db.

* Schema and seeds files are available and should be executed prior to application use via 'npm run seeds'. Look for 'cryptochat_db' and three tables (user/comment/post) to verify files successfully ran.

* To run the application, enter 'node server.js' inside terminal. 

<a name="code"></a>
## Example code

* Example code for post, comment and user relationships:

![Model index image](https://github.com/stefanieklogan/Week15-Project2-Group4/blob/main/Public/images/modelIndex.JPG)

* Example route for saving user post:

![post route](https://github.com/stefanieklogan/Week15-Project2-Group4/blob/main/Public/images/postRoute.JPG)

* Example of handlebars:

![handlebars](https://github.com/stefanieklogan/Week15-Project2-Group4/blob/main/Public/images/handlebars.JPG)

<a name="squad"></a>
## Crypto Chat code squad:

* Stefanie Logan

* Raquel Scofield

* Marisa NeSmith

<a name="streetcred"></a>
## The other stuff: License & Badges

* Copyright © Nicolas Gallagher and Jonathan Neal, The MIT License (MIT)
