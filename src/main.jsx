import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'line-seed-jp/line-seed-jp.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
