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

    this.leave = function (channel, message) {

        if (typeof message === "undefined") {
            message = {};
        }

        message['__leave__'] = channel;

        if (isDebug) {
            console.log("Leaving channel "+channel);
        }

        connection.send(JSON.stringify(message));
    }

    this.listen = function (channel, callback, message) {

        if (typeof message === "undefined") {
            message = {};
        }

        message['__listen__'] = channel;

        if (isDebug) {
            console.log("Listening to channel "+channel);
        }

        connection.send(JSON.stringify(message));

        connection.onmessage = callback;
    }

    this.on = function(callback) {
        connection.onopen = callback;
    }
}
