const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  updateTitleBarTheme: (theme) => ipcRenderer.invoke('update-title-bar-theme', theme)
}); 