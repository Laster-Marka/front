import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/reset.css'
import './styles/theme.css'
import './styles/typography.css'
import './styles/index.css'
import { App } from './app'
import { reportWebVitals } from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
