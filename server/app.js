/**
 * Created by horaciomunoz on 14/3/16.
 */
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoosePaginate = require('mongoose-paginate'),
    mongoose        = require('mongoose'),
    server = require('http').Server(app),
    cors = require('cors'),
    io = require('socket.io')(server);

mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 10
};


//Conectar a la DB
mongoose.connect('mongodb://localhost/iot_dev_relaciones', function (error,res) {
    if (error) console.log("Error: Base de Datos" + error);
    else  console.log("Conectada a la Base Mongo");
});


var menssages = [];


app.use(express.static('public'));


// use it before all route definitions
app.use(cors({origin: '*'}));

// Configurar app para usar bodyParser
// con este paquete obtendremos
// los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());



// Import Models and controllers

var modelLineadb     = require('./models/lineadb')(app, mongoose);
var modelTododb     = require('./models/tododb')(app, mongoose, mongoosePaginate);

var todoCrt = require('./controllers/todoCrt');
var lineaCrt = require('./controllers/lineaCrt');




// Example Route  No se Usa
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var todoRuta= express.Router();


todoRuta.route('/todopag/:pag')
    .put(todoCrt.findAllPag);

todoRuta.route('/todo')
    .get(todoCrt.findAll)
    .post(todoCrt.add);

todoRuta.route('/todo/:id')
    .get(todoCrt.findById)
    .put(todoCrt.update)
    .delete(todoCrt.delete);

todoRuta.route('/linea')
    .get(lineaCrt.findAll)
    .post(lineaCrt.add);

todoRuta.route('/linea/:id')
    .get(lineaCrt.findById)
    .put(lineaCrt.update)
    .delete(lineaCrt.delete);


app.use('/api', todoRuta);


//Socket
io.on('connection', function (socket) {
    var linea = socket.handshake.query.linea;
    console.log("Alguien se conecto a Linea: " + linea);
    socket.join(linea);
    socket.to(linea).emit('messages', menssages);

    socket.on('new-menssage', function (data) {
        console.log("new-menssage:" + data.texto);
        menssages.push(data);
        io.to(data.linea).emit('messages', menssages);
    })
});




server.listen(8000, function () {
    console.log("running");
})