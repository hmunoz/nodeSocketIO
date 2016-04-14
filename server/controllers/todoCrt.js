var mongoose = require('mongoose');
var Todo  = mongoose.model('Todo');
var Linea  = mongoose.model('Linea');


exports.findAll = function(req, res) {
   Todo.find(function(err, todos) {
        if(err) res.send(500, err.message);
        console.log('GET /findAll')
        Linea.populate(todos, {path: "linea"},function(err, todos){
            res.status(200).jsonp(todos);
        });
    });
};


exports.findAllPag = function(req, res) {
    var filtros = req.body;


    var query = {};

    try {
        if (filtros["texto"] || filtros["texto"].value!='')
        {
            query = {texto:new RegExp(filtros.texto.value, 'i')};
        }
        if (filtros["autor"] || filtros["autor"].value!='')
        {
            query = {autor:new RegExp(filtros.autor.value, 'i')};
        }
        
        if (filtros["linea.texto"] || filtros["linea.texto"].value!='')
        {
            console.log(filtros['linea.texto'].value);
            
            query = {linea: new Linea(filtros['linea.texto'].value) };
        }
    } catch(e) {
        console.log(e);
    }


    
    
    var options = {
        sort: { 'texto': 1 },
        populate: 'linea',
        lean: true,
        page: req.params.pag,
        limit: 10
    };

    Todo.paginate(query, options).then(function(result) {
        res.status(200).jsonp(result);
    });

};


exports.findById = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(err) return res.send(500, err.message);

        console.log('GET /findById/' + req.params.id);
        Linea.populate(todo, {path: "linea"},function(err, todo){
            res.status(200).jsonp(todo);
        });
    });
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var todo = new Todo(req.body);

    todo.save(function(err, todo) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(todo);
    });
};



exports.update = function(req, res) {
    console.log('PUT/ update');
    Todo.findById(req.params.id, function(err, todo) {

        var todo = new Todo(req.body);
        
        console.log(todo);
        todo.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(todo);
        });
    });
};

exports.delete = function(req, res) {
    console.log('DELETE /delete:' + req.params.id);
    Todo.remove({ _id: req.params.id}, function(err){
        if(err) {
            console.log(err.message);
            return res.send(500, err.message);
        }
        console.log('Delete OK');
        return res.status(200);
    });
};
