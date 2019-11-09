var electron = require("electron");
var path = require("path");
var url = require("url");
var device = require('./os-app/device');

var win;

electron.app.on("ready", createWindow);
electron.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {

    win = new electron.BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: "file:",
        slashes: true
    }));

    win.on("closed", function () {
        win = null;
    });

}

//'/dev/ttyUSB0'
electron.ipcMain.on("startDeviceToRead", (event, arg) => {
    device.listenOnSerialPort(event.sender, arg.port);
});





