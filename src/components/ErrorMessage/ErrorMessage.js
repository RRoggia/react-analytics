import React from 'react'
import './ErrorMessage.css'

function ErrorMessage( props ) {
    return (
        <div hidden={ props.hidden } className="error">
            { props.message }
        </div>
    )
}

export default ErrorMessage