const { spawn } = require('child_process');
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let viteProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false
    },
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Load the app
  mainWindow.loadURL('http://localhost:5173');
}

function startVite() {
  console.log('Starting Vite dev server...');
  viteProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  // Wait for Vite to start
  setTimeout(() => {
    createWindow();
  }, 3000);
}

// Start the app
startVite();

// Handle app lifecycle
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (viteProcess) {
    viteProcess.kill();
  }
}); 