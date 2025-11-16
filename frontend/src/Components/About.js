import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">Sobre la Biblioteca</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=913&q=80" alt="" />
                </div>
                <div>
                    <p className="about-text">
                        La Biblioteca Pública Municipal de Rionegro es un espacio abierto a toda la comunidad, dedicado a fomentar la lectura, el aprendizaje y el acceso a la información. Contamos con una amplia colección de libros, revistas, recursos digitales y espacios de estudio para niños, jóvenes y adultos.<br/>
                        <br/>
                        Ofrecemos servicios de préstamo de libros, acceso a internet, actividades culturales, talleres educativos, asesoría en investigación y apoyo escolar. Nuestro equipo está siempre dispuesto a ayudarte a encontrar el material que necesitas y a orientarte en el uso de nuestros recursos.<br/>
                        <br/>
                        La biblioteca es un punto de encuentro para el desarrollo cultural y social del municipio, promoviendo valores de inclusión, respeto y colaboración. ¡Te invitamos a visitarnos y aprovechar todos nuestros servicios!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
