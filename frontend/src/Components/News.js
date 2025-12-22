import React from 'react'
import './News.css'

function News() {
    return (
        <div className='news-container'>
            <h2 className='news-title'>Novedades para Ti</h2>
            <div className='news-data'>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Concursos</h1>
                    <div>
                        <div className='news-competition-event'>
                            <p>Concurso-1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Concurso-2</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Concurso-3</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Concurso-4</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Concurso-5</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Quiz en Línea</h1>
                    <div>
                        <div className='news-quiz-event'>
                            <p>Quiz-1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-2</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-3</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-4</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-5</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry.</p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
            </div>
        </div>
    )
}

export default News
