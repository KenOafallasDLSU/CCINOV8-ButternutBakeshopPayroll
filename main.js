// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const handlebarsHbs = require('electron-hbs');
const path = require('path')

const newHandlebars = new handlebarsHbs(
  path.join(__dirname, 'views'), // the path to views folder
  path.join(__dirname, 'views', 'layouts'), // the path to layouts
  'main.hbs',// the main file i'ts similar to the following example
  path.join(__dirname, 'views', 'temp') // the temp folder i'ts very important because since that's where all the .html already rendered are saved
);

// window declarations
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  /*mainWindow.loadURL(newHandlebars.render('login.hbs', {
      message: "Catra x Adora forever!!",
      title: "Login",
      css_ref: "../../assets/css/login.css"
    })
  );*/
  
  mainWindow.loadURL(newHandlebars.render('admin-facing.hbs', {
      css_ref: "../../assets/css/admin-facing.css"
    })
  );
  
  mainWindow.on("closed", () => {
    app.quit()
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// removes all rendered files 
app.on("quit", () => {
  newHandlebars.clearTemps();
});