const express = require('express');

const mysql = require('mysql');

const app = express();


const config = require("./config");



const conn = mysql.createConnection({
          host: 'localhost',
          user: config.dbUser,
          password: config.dbPassword,
          database: config.db,

});





conn.connect(function (err) {
        if(err){
                console.log("error occured while connecting");
                console.log(err)
        }else{
                console.log("Connected successfully");
        }
});


/*

{
    "username": "Sam",
    "email": "sam@gmail.com",
    "password": "ibadan"
}

*/ 


// app.get('/', (req, res) => {
//         //   conn.query(
//                     console.log("DB connected")
//         //   )
// })


app.post('/api/signup', (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	conn.query(
		'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',

		[username, email, password],

		(error, results) => {

			res.send("User registered");
		}
	);
})


// get all users
app.get('/index', (req, res) => {

        conn.query(
                "SELECT * FROM items",
                (error, results) => {
                        console.log(results);

                        res.send("Showing all users");
                }
        )
})




// get users
// http://localhost:3000/api/users

// post users
// http://localhost:3000/api/users



app.listen(3001, () => {
          console.log("Astrapay running on port: 3001")
})