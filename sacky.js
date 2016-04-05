sacky = function (ip, port) {

    var connection = new WebSocket("ws://"+ip+":"+port);

    this.emit = function (channel, message) {
        message['channel'] = channel;
        connection.send(JSON.stringify(message));
    }

    this.listen = function (channel, callback) {

        var listen = {
            '__listen__': channel
        };

        connection.onopen = function(e) {
            connection.send(JSON.stringify(listen));
        }

        connection.onmessage = callback;
    }
}
