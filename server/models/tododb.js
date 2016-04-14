exports = module.exports = function(app, mongoose,mongoosePaginate) {
    var schema = mongoose.Schema;

    var todo = new mongoose.Schema({
        texto   : { type: String, required: true },
        autor   : { type: String, required: true },
        linea: { type: schema.ObjectId, ref: "Linea",required: true },
        votes   : { type: Number, min: 0, max: 1000, default: 0 }
    });

    todo.plugin(mongoosePaginate);
    mongoose.model('Todo', todo);
};
