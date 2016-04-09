exports = module.exports = function(app, mongoose) {
    var Schema = mongoose.Schema;

    var todo = new mongoose.Schema({
        texto   : { type: String, required: true },
        autor   : { type: String, required: true },
        linea: { type: Schema.ObjectId, ref: "Linea",required: true },
        votes   : { type: Number, min: 0, max: 1000, default: 0 }
    });


    mongoose.model('Todo', todo);

};
