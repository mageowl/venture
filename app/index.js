const { app, BrowserWindow } = require("electron");
let window = null;

function createWindow() {
	window = new BrowserWindow({
		width: 1050,
		height: 750,
		webPreferences: {
			nodeIntegration: true
		}
	});

	window.loadFile("page/index.html");
}

app.whenReady().then(() => {
	createWindow();
});
