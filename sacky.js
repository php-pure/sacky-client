sacky = function (address, options) {

    var isDebug = (typeof options === "undefined") ? false : options.debug;
    var connection = new WebSocket("ws://"+address);

    this.emit = function (channel, message) {
        message['channel'] = channel;

        if (isDebug) {
            console.log("Sending message to channel "+channel);
        }

        connection.send(JSON.stringify(message));

    }

    this.destroy = function (channel) {

        var destroy = {
            '__destroy__': channel
        }

        if (isDebug) {
            console.log("Destroying channel "+channel);
        }

        connection.send(JSON.stringify(destroy));
    }

    this.listen = function (channel, callback) {

        var listen = {
            '__listen__': channel
        };

        if (isDebug) {
            console.log("Listening to channel "+channel);
        }

        connection.send(JSON.stringify(listen));

        connection.onmessage = callback;
    }

    this.on = function(callback) {
        connection.onopen = callback;
    }
}
