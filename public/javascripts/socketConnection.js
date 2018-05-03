//Make connection
var socket = io.connect('http://localhost:3000/')

// Listen for events
socket.on('newClient', function(data){
    
    console.log(data);

    $('#test').html("Online users: " +data.clients);
});