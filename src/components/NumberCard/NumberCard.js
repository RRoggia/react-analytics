import React from 'react'
import './NumberCard.css'

function NumberCard(props) {
    return <div className='card'>
        <h2>{ props.numberOfPosts }</h2>
        <p>{ props.subscription }</p>
    </div>
}

export default NumberCard