import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './layout/Header.jsx'
import App from './App.jsx'
import Footer from './layout/Footer.jsx'
//import ModalExample from './ModalExample.jsx'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />
        <App />
        <Footer />
    </React.StrictMode>,
)
