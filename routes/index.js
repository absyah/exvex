module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs') // load index.ejs
    });

};