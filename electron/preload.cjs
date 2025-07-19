const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe API for renderer
contextBridge.exposeInMainWorld('electronAPI', {
  showNotification: (title, body) => {
    new Notification(title, { body });
  },
  // Add APIs here as needed
}); 