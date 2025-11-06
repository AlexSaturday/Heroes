import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

// для эмуляции __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = process.env.IS_DEV === "true"

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js') // для безопасности
    }
  })

  // порт 5173
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})