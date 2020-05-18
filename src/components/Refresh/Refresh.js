import React from 'react'
import './Refresh.css'

function Refresh( props ) {
    return(
        <div className="floating-right">
            <button onClick={ props.onClick }>Refresh</button>
        </div>
    ) 
}

export default Refresh