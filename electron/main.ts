import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import debug from 'electron-debug'

debug();

process.env.APP_ROOT = path.join(__dirname, '..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, '.output/public')

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL && process.env.NODE_ENV === 'development'
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST

if (process.env.NODE_ENV === 'development')
    process.env.VITE_DEV_SERVER_URL = "http://localhost:3000"


let win: BrowserWindow | null

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(MAIN_DIST, 'preload.js')
        }
    })


    if (process.env.NODE_ENV === 'development' && process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
    }

}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(() => {
    console.log('App is ready', process.env.VITE_DEV_SERVER_URL)
    createWindow();
})