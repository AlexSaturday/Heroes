const { contextBridge } = require('electron')

// Если понадобятся API для взаимодействия с Node.js
contextBridge.exposeInMainWorld('electronAPI', {
  // Здесь можно добавить методы для работы с файлами и т.д.
})