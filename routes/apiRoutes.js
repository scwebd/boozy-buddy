module.exports = function(app, connection) {
    // get of /api/beers => JSON of all beers, DESC by rating
    app.get("/api/beers", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY rating DESC", { type: "beer" }, (err, results) => {
            if (err) throw err;

            res.json(results);
        });
    });

    // get of /api/cocktails => JSON of all cocktails, DESC by rating
    app.get("/api/cocktails", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY rating DESC", { type: "cocktail" }, (err, results) => {
            if (err) throw err;

            res.json(results);
        });
    });

    // get of /api/wines => JSON of all wines, DESC by rating
    app.get("/api/wines", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY rating DESC", { type: "wine" }, (err, results) => {
            if (err) throw err;

            res.json(results);
        });
    });

    // get of /api/loves => JSON of all drinks where 'love=true', alphabetized
    app.get("/api/loves", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY name ASC", { love: true }, (err, results) => {
            if (err) throw err;

            res.json(results);
        });
    });

    // get of /api/hates => JSON of all drinks where 'hate=true', alphabetized
    app.get("/api/hates", (req, res) => {
        connection.query("SELECT * FROM drinks WHERE ? ORDER BY name ASC", { hate: true }, (err, results) => {
            if (err) throw err;

            res.json(results);
        });
    });

    // post to /api/drinks => adds a new drink to table
    app.post("/api/drinks", (req, res) => {
        const drink = req.body;
        drink.love = drink.love === "true";
        drink.hate = drink.hate === "true";
        drink.price = parseFloat(drink.price) || null;

        connection.query("INSERT INTO drinks SET ?", drink, (err, result) => {
            if (err) throw err;

            console.log(`Inserted ${result.affectedRows} rows of data!`);

            res.end();
        })
    });
}
