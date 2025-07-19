const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

let mainWindow;

async function createWindow() {
  console.log('Creating window...');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Carto - E-commerce Cart & Price Tracker',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1a1a1a',
      symbolColor: '#ffffff',
      height: 32
    },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    },
    show: false
  });
  
  console.log('Window created, loading URL...');

  // Load the app
  // Try multiple ports for development server
  const ports = [5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180, 5181, 5182, 5183, 5184, 5185, 5186, 5187, 5188, 5189, 5190, 5191, 5192, 5193, 5194, 5195, 5196];
  let devServerURL = 'http://localhost:5173';
  
  // Try to find the correct port
  for (const port of ports) {
    try {
      const response = await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
          resolve(res);
        });
        req.on('error', () => {
          resolve(null);
        });
        req.setTimeout(1000, () => {
          req.destroy();
          resolve(null);
        });
      });
      
      if (response && response.statusCode === 200) {
        devServerURL = `http://localhost:${port}`;
        console.log(`Found Vite server at ${devServerURL}`);
        break;
      }
    } catch (error) {
      // Continue to next port
    }
  }
  
  console.log('Attempting to load:', devServerURL);
  
  mainWindow.loadURL(devServerURL).then(() => {
    console.log('URL loaded successfully');
    mainWindow.webContents.openDevTools();
  }).catch((error) => {
    console.error('Failed to load URL:', error);
    // Try loading a local file instead
    mainWindow.loadFile(path.join(__dirname, '../index.html')).catch((fileError) => {
      console.error('Failed to load file:', fileError);
    });
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Remove the menu bar
  const { Menu } = require('electron');
  Menu.setApplicationMenu(null);
  
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for file operations
ipcMain.handle('show-save-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});

ipcMain.handle('show-open-dialog', async (event, options) => {
  const result = await dialog.showOpenDialog(mainWindow, options);
  return result;
});

ipcMain.handle('open-external', async (event, url) => {
  await shell.openExternal(url);
});

// IPC handler for updating title bar theme
ipcMain.handle('update-title-bar-theme', async (event, { isDark, accentColor }) => {
  if (mainWindow) {
    const titleBarColor = isDark ? '#1a1a1a' : '#ffffff';
    const symbolColor = isDark ? '#ffffff' : '#000000';
    
    mainWindow.setTitleBarOverlay({
      color: titleBarColor,
      symbolColor: symbolColor,
      height: 32
    });
  }
}); 