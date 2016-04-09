exports = module.exports = function(app, mongoose) {


    var linea = new mongoose.Schema({
        texto   : { type: String, required: true }
    });


    mongoose.model('Linea', linea);

};
