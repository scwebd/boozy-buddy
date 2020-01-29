// We use the path package to target the correct path to find the HTML docs in our file system
const path = require("path");

module.exports = function (app) {
    app.get("/beers", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/beers.html"));
    });

    app.get("/cocktails", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/cocktails.html"));
    });

    app.get("/wines", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/wines.html"));
    });

    app.get("/drinks/loves", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/loves.html"));
    });

    app.get("/drinks/hates", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/hates.html"));
    });
}
