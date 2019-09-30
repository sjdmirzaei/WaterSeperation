const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

function listenOnSerialPort(sender , port)
{
    var port = new SerialPort(port);
    var parser = new Readline();
    port.pipe(parser);

    parser.on('data', line => {        
        console.log(line);
        sender.send('startDeviceToReadRes', line);
    });
}

module.exports = {
    listenOnSerialPort
}





