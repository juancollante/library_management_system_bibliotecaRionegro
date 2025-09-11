import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1>Contáctanos</h1>
                        <p>Bibliotecario</p>
                        <p>Biblioteca Pública Municipal</p>
                        <p>Rionegro, Antioquia</p>
                        <p>Colombia</p>
                        <p><b>Email:</b> ejemplo@biblioteca.gov.co</p>
                    </div>
                    <div className='usefull-links'>
                        <h1>Enlaces Útiles</h1>
                        <a href='#home'>Inicio</a>
                        <a href='#books'>Libros</a>
                        <a href='#about'>Sobre la Biblioteca</a>
                        <a href='#contact'>Contacto</a>
                    </div>
                    <div className='librarian-details'>
                        <h1>Bibliotecario</h1>
                        <p>Juan Pérez</p>
                        <p>Licenciado en Bibliotecología</p>
                        <p>Contacto: +57 3123456789</p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='#home' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><LinkedInIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><TelegramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2025 Todos los derechos reservados<br /><span>Diseñado con ❤️ por el equipo de la Biblioteca Pública de Rionegro</span></p>
            </div>
        </div>
    )
}

export default Footer