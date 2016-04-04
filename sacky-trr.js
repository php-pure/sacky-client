sacky = function (ip, port) {

    var connection = new WebSocket("ws://"+ip+":"+port);
    var identifier = {};

    this.identifier = function (args) {
        identifier = args;

        return this;
    }

    this.emit = function (message, args) {

        connection.onopen = function(e) {

            args['message'] = message;
            args['_identifier'] = identifier;

            // connection = this;
            this.send(JSON.stringify(args));
        }
    }

}

var group = "#phpdevs";

var sacky = new sacky("192.168.10.10", "8080");

// it has an identifier, which uses 'group'
sacky.identifier({'group': group});

sacky.emit("hello team!", { 'group': group });
