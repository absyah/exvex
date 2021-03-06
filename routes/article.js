var Article = require('../models/article')

module.exports = function(app, passport){

    /**
    * Find and retrieves all articles
    * @param {Object} req HTTP request object.
    * @param {Object} res HTTP response object.
    */

    findAllArticles = function(req, res){

        console.log('GET - /articles');
        
        return Article.find(function(err, articles){
            if(!err){
                return res.send(articles);
            }else{
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server Error' });
            }
        });      
    };

    /**
    * Find and retrieves a single article by its ID
    * @param {Object} req HTTP request object.
    * @param {Object} res HTTP response object.
    */

    findById = function(req, res){

        console.log('GET - /article/:id');

        return Article.findById(req.params.id, function(err, article){
            if(!article){
                res.statusCode = 404;
                return res.send({ error: 'Page not found' });
            }

            if(!err){
                return res.send({ status: 'OK', article: article });
            }else{
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server Error' });
            }
        });
    };

    /**
    * Creates a new article from the data request
    * @param {Object} req HTTP request object.
    * @param {Object} res HTTP response object.
    */

    addArticle = function(req, res){
        
        console.log('POST - /article');

        var article = new Article({
            title       : req.body.title,
            description : req.body.description,
            content     : req.body.content
        });

        article.save(function(err){
            if(err){
                console.log('Error while saving article : ' + err);
                res.send({ error: err });
                return
            }else{
                console.log('Article created')
                res.send({ status: 'OK', article: article })
            }
        });
    };

    /**
    * Update a article by its ID
    * @param {Object} req HTTP request object.
    * @param {Object} res HTTP response object.
    */

    updateArticle = function(req, res){

        console.log('PUT - /article/:id');
        return Article.findById(req.params.id, function(err, article){

            if(!article){
                res.statusCode = 404;
                return res.send({ error: 'Page not found' });
            }

            if (req.body.title != null) article.title = req.body.title;
            if (req.body.description != null) article.description = req.body.description;
            if (req.body.content != null) article.content = req.body.content;

            return article.save(function(err){
                if(!err){
                    console.log('updated.');
                    return res.send({ status: 'OK', article: article });
                }else{
                    if(err.name == 'ValidationError'){
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    }else{
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }

                    console.log('Internal server error(%d): %s', res.statusCode, err.message);
                
                }

                res.send(article);
            });
        });
    };

    /**
    * Delete a article by its ID
    * @param {Object} req HTTP request object.
    * @param {Object} res HTTP response object.
    */

    deleteArticle = function(req, res){

        console.log('DELETE - /article/:id');

        return Article.findById(req.params.id, function(err, article){
            if(!article){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            return article.remove(function(err){
                if(!err){
                    console.log('Removed article.');
                    return res.send({ status: 'OK' });
                }else{
                    res.statusCode = 500;
                    console.log('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' })
                }
            })
        })
    };

    // Link routes and action

    app.get('/articles', findAllArticles);
    app.get('/article/:id', findById);
    app.post('/article', addArticle);
    app.put('/article/:id', updateArticle);
    app.delete('/article/:id', deleteArticle);
};