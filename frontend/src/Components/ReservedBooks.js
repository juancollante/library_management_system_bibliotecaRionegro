import React from 'react'
import './ReservedBooks.css'

function ReservedBooks() {
    return (
        <div className='reservedbooks-container'>
            <h2 className='reservedbooks-title'>Libros Reservados</h2>
            <table className='reservedbooks-table'>
                <tr>
                    <th>Nombre</th>
                    <th>Libro</th>
                    <th>Fecha</th>
                </tr>
                <tr>
                    <td>Pranav</td>
                    <td>Rich Dad Poor Dad</td>
                    <td>12/7/2021</td>
                </tr>
                <tr>
                    <td>Sashank</td>
                    <td>The Subtle Art</td>
                    <td>10/7/2021</td>
                </tr>
                <tr>
                    <td>Tanishq</td>
                    <td>Wings Of Fire</td>
                    <td>15/9/2021</td>
                </tr>
                <tr>
                    <td>Akhil</td>
                    <td>The Secret</td>
                    <td>02/9/2021</td>
                </tr>
                <tr>
                    <td>Surya</td>
                    <td>Bad Guys</td>
                    <td>21/7/2021</td>
                </tr>
                <tr>
                    <td>Dinesh</td>
                    <td>Giovanni Rovelli</td>
                    <td>02/7/2021</td>
                </tr>
            </table>
        </div>
    )
}

export default ReservedBooks
