// note that this file's export is a function that takes in 'app' and 'connection'... each
// of these objects is threaded through when our exported function is called, in server.js
module.exports = function(app, connection) {
    app.get("/api/beers", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY rating DESC", { type: "beer" }, (err, results) => {
            // if there's an error with our query, we're sending a status '500', indicating
            // a server error; in doing so, the res.end() also terminates the request/response
            // cycle and tells the front-end (browser) that the transaction is complete
            if (err) return res.status(500).end();

            // if all goes well with the db query, sending a JSON of the data to the front-end,
            // and terminating the request/response cycle; this action by the back-end server 
            // will trigger the front-end AJAX call's .then/callback
            res.json(results);
        });
    });

    app.get("/api/cocktails", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY rating DESC", { type: "cocktail" }, (err, results) => {
            if (err) return res.status(500).end();

            res.json(results);
        });
    });

    app.get("/api/wines", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY rating DESC", { type: "wine" }, (err, results) => {
            if (err) return res.status(500).end();

            res.json(results);
        });
    });

    app.get("/api/loves", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY name ASC", { love: true }, (err, results) => {
            if (err) return res.status(500).end();

            res.json(results);
        });
    });

    app.get("/api/hates", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY name ASC", { hate: true }, (err, results) => {
            if (err) return res.status(500).end();

            res.json(results);
        });
    });

    app.post("/api/drinks", (req, res) => {
        const drink = req.body;
        // the following three lines make some transformations to the data sent from the
        // front-end to the back-end route; when data is sent via AJAX, values like numbers
        // and booleans are sent as strings... this often means that we must convert them
        // to the appropriate type (ie back into booleans or numbers) on the back-end
        // to ready them for database insertion
        drink.price = parseFloat(drink.price) || null; // converts price to a decimal or a null
        drink.love = drink.love === "true"; // converts "true"/"false" to their boolean counterpart
        drink.hate = drink.hate === "true";

        connection.query("INSERT INTO drinks SET ?", drink, (err, result) => {
            if (err) return res.status(500).end();

            console.log(`Inserted ${result.affectedRows} rows of data!`);

            // this res.end() terminates the request/response cycle and triggers the
            // .then/callback on the front-end AJAX call!
            res.end();
        })
    });
}
