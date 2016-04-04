/**
 * Created by horaciomunoz on 14/3/16.
 */
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    server = require('http').Server(app),
    io = require('socket.io')(server);




//Conectar a la DB
mongoose.connect('mongodb://localhost/iot', function (error,res) {
    if (error) console.log("Error: Base de Datos" + error);
    else  console.log("Conectada a la Base Mongo");
});


var menssages = [];


app.use(express.static('public'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// Import Models and controllers
var modelsMessagedb     = require('./models/messagedb')(app, mongoose);
var MessageCrt = require('./controllers/message');




// Example Route  No se Usa
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var messagesRuta= express.Router();

messagesRuta.route('/message')
    .get(MessageCrt.findAll)
    .post(MessageCrt.add);

messagesRuta.route('/message/:id')
    .get(MessageCrt.findById)
    .put(MessageCrt.update)
    .delete(MessageCrt.delete);

app.use('/api', messagesRuta);


//Socket
io.on('connection', function (socket) {
    var sala = socket.handshake.query.sala;
    console.log("Alguien se conecto: " + sala);
    socket.join(sala);
    socket.to(sala).emit('messages', menssages);

    socket.on('new-menssage', function (data) {
        console.log("new-menssage:" + data.texto);
        menssages.push(data);
        io.to(data.sala).emit('messages', menssages);
    })
});




server.listen(8000, function () {
    console.log("running");
})