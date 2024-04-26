const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql2');
try {
    var connection = require("./database.js");
    var {insertUser,insertGroup,insertTask,insertGroupUser,returnTable} = require("./dataQueries.js")
} catch (error) {console.log(error);}
const fs = require('fs');
var readline = require('readline');


const port = 8080;


// ==============================================
/** Sets up the database with the right tables. 
 * 
 */
// ==============================================


//Read the contents of setup.sql
// Cannot have gaps between code segments
var rl = readline.createInterface({
    // Gets the sql file to read
    input: fs.createReadStream('./sql/setup.sql'),
    terminal: false
   });
  rl.on('line', function(chunk){
       connection.query(chunk.toString('ascii'), function(err, sets, fields){
       // Error checking on the sql file
       // if (err != "Error: Query was empty")  {console.log(err)}
      });
  });

 
  insertGroupUser(1, 1);
  returnTable("group_user");

// ==============================================



// ==============================================
/** All the app.uses go here.
 *  - These link to different routers which control different aspects of the app
 */
// ==============================================
app.use(express.static('public'));
app.use('/', require('./path_router'));

//use the views ejs files
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
// ==============================================



// ==============================================
/** This section starts the app an has any error handling routes on the
 *  base level.
 */
// ==============================================

// Define the route if someone goes somewhere where there is no html file
app.get('*', (req, res) => {
    // This directs the router to the specific file
    // res.sendFile(path.join(__dirname, 'public','home.html'));
    // res.render('path/index');
    res.status(404).send('404 Page Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

// ==============================================







// ==============================================
/** Unused Code goes here. 
 *  
 * 
 */
// ==============================================
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

// Define a route
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// ==============================================
