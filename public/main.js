var socket;
var sala;

function render(data) {

    var html = data.map(function (data,index) {
        if (data.sala == sala){
            return (`<div> 
                    <strong> ${data.autor}</strong>
                    <em> ${data.text}</em>
                </div>`);
        }
    }).join(" ");



    document.getElementById('html').innerHTML = html;
}


function addMenssage(e) {
        var payload = {
            autor:document.getElementById('usuario').value,
            text:document.getElementById('texto').value,
            linea:document.getElementById('linea').value
        };

    socket.emit('new-menssage',payload );

    return false;
}

function  connect(e) {

    sala = document.getElementById('sala').value;

    socket = io.connect('http://localhost:8000/', {forceNew:true, query:"linea=" + linea});

    socket.on('messages',function (data) {
        console.log(data);
        render(data);
    });
}

