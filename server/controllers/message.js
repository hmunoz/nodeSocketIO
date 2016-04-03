var mongoose = require('mongoose');
var Message  = mongoose.model('Message');

//GET - Return all tvshows in the DB
exports.findAll = function(req, res) {
    Message.find(function(err, messages) {
        if(err) res.send(500, err.message);

        console.log('GET /findAll')
        res.status(200).jsonp(messages);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
    Message.findById(req.params.id, function(err, message) {
        if(err) return res.send(500, err.message);

        console.log('GET /findById/' + req.params.id);
        res.status(200).jsonp(message);
    });
};



//POST - Insert a new TVShow in the DB
exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var message = new Message({
        autor:    req.body.autor,
        texto: 	  req.body.texto
    });

    message.save(function(err, message) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(message);
    });
};


//PUT - Update a register already exists
exports.update = function(req, res) {
    Message.findById(req.params.id, function(err, message) {

        message.autor   = req.body.autor;
        message.texto    = req.body.texto;


        message.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(message);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.delete = function(req, res) {
    console.log('DELETE /delete');
    Message.remove({ id: req.params.id}, function(err){
        if(err) return res.send(500, err.message);
        res.status(200);
    });

};
