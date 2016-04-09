var mongoose = require('mongoose');
var Linea  = mongoose.model('Linea');


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
    Linea.find(function(err, resultados) {
        if(err) res.send(500, err.message);

        console.log('GET /findAll' + resultados.toString())
        res.status(200).jsonp(resultados);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {

    changeCrossControl(res);

    Linea.findById(req.params.id, function(err, resultado) {
        if(err) return res.send(500, err.message);

        console.log('GET /findById/' + req.params.id);
        res.status(200).jsonp(resultado);
    });
};



//POST - Insert a new TVShow in the DB
exports.add = function(req, res) {
    changeCrossControl(res);

    console.log('POST');
    console.log(req.body.texto);

    var entidad = new Linea({
        texto:    req.body.texto
    });

    entidad.save(function(err, resultado) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(resultado);
    });
};


//PUT - Update a register already exists
exports.update = function(req, res) {
    changeCrossControl(res);

    Linea.findById(req.params.id, function(err, todo) {

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
    Linea.remove({ id: req.params.id}, function(err){
        if(err) return res.send(500, err.message);
        res.status(200);
    });

};
