import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { WeatherProvider } from './context/WeatherContext'
import './styles/styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
)
