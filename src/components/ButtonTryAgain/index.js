import React from 'react';

import './button-try-again.css';
const ButtonTryAgain = (props) => {
    return (
        <button className="button-try-again" onClick={ props.handleClick }>try again</button>
    )
}

export default ButtonTryAgain;