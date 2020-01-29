// Dependencies:
// =============================================================
const express = require("express");
const mysql = require("mysql")

// our custom instance of Express; from here on out, we primarily interface with Express
// using this variable
const app = express();

// dynamic port number! on external servers, this variable will use the provided environmental
// variable value (whatever port the server specifies) else it defaults to 8000
const PORT = process.env.PORT || 8000;

// setup for connecting to our MySQL db using the 'mysql' database; note that your database
// will have a different port number than your Express server; this is intentional and very
// important!
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "boozy_buddy"
});

// Middleware: 
// (code that runs after the server receives the request/before we access req/res in the routes) 
// =============================================================
// these two lines are VERY important if your app allows users to add or edit data; these
// lines give us access to the JSON the POSTS/PUTS under the key/val pair of req.body!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// this line tells Express to look inside the 'public' folder anytime a request is made...
// since this line is listed above our routes, Express checks there first anytime a request
// is made, to see if this location contains the desired resource; this setup helps us avoid
// building extra routes to serve up things like static HTML/CSS/images/front-end JS
app.use(express.static("public"));


// Database Connection:
// (connecting to our database server in particular; once connected we can now query away!)
// =============================================================
connection.connect((err) => {
    if (err) throw err;

    console.log(`Connected to MySQL database as id ${connection.threadId}`);
});

// Routes:
// =============================================================
// requiring (importing) all of our API and HTML routes; each of the blocks of code we're
// requiring is a function, and the `(app)` afterward each require calls that function and
// threads through our app and connections variables... this means we can now use these
// objects inside the routes!
require("./routes/apiRoutes")(app, connection);
require("./routes/htmlRoutes")(app);


// Server Listen:
// (kicking off our web server's 'listen', which now watches for requests and sends responses)
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});
