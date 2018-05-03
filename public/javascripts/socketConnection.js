//Make connection
var socket = io.connect('http://localhost:3000/')

var name = ""

// $('#NameSubmit').click(function(){
//     name = $('#name').val();
//     socket.emit('newClient', {name: name});    
// })

$('#Room').click(function(){
    roomName = $('#roomName').val();
    socket.emit('newRoom', {room: roomName});    
})

socket.on('socketToMe', function (data) {
    alert(data.clients);
});


// Listen for events
// socket.on('newClient', function(data){
//     //console.log(data);
//     $('#test').html("Online users: " +data.clients);
// });

socket.on('rooms', function(data){
    console.log(data.rooms);
    $('#test').html("Online users: " +data.rooms);
});