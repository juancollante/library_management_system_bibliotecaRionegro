import React from 'react'
import './WelcomeBox.css'

function WelcomeBox() {
    return (
        <div className='welcome-box'>
            <p className='welcome-title'>BIENVENIDO A LA BIBLIOTECA</p>
            <p className='welcome-message'>Alimenta tu mente<br/>
            <span className='welcome-submessage'>Toma un libro para leer</span></p>
        </div>
    )
}

export default WelcomeBox
