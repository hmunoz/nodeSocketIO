exports = module.exports = function(app, mongoose) {

    var mns = new mongoose.Schema({
        autor: 		{ type: String },
        texto: 		{ type: String }
    });


    mongoose.model('Message', mns);

};
