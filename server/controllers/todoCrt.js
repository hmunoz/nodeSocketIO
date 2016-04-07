var mongoose = require('mongoose');
var Todo  = mongoose.model('Todo');


function changeCrossControl(res){
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "x-requested-with");
    res.header("Content-Type", "application/x-www-form-urlencoded");

}

//GET - Return all tvshows in the DB
exports.findAll = function(req, res) {

    changeCrossControl(res);
    Todo.find(function(err, todos) {
        if(err) res.send(500, err.message);

        console.log('GET /findAll')
        res.status(200).jsonp(todos);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {

    changeCrossControl(res);

    Todo.findById(req.params.id, function(err, todo) {
        if(err) return res.send(500, err.message);

        console.log('GET /findById/' + req.params.id);
        res.status(200).jsonp(todo);
    });
};



//POST - Insert a new TVShow in the DB
exports.add = function(req, res) {
    changeCrossControl(res);

    console.log('POST');
    console.log(req.body.linea);

    var todo = new Todo({
        autor:    req.body.autor,
        texto: 	  req.body.texto,
        linea: 	  req.body.linea
    });

    todo.save(function(err, todo) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(todo);
    });
};


//PUT - Update a register already exists
exports.update = function(req, res) {
    changeCrossControl(res);

    Todo.findById(req.params.id, function(err, todo) {

        todo.autor   = req.body.autor;
        todo.texto    = req.body.texto;
        todo.linea    = req.body.linea;


        todo.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(todo);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.delete = function(req, res) {
    changeCrossControl(res);

    console.log('DELETE /delete');
    Todo.remove({ id: req.params.id}, function(err){
        if(err) return res.send(500, err.message);
        res.status(200);
    });

};
