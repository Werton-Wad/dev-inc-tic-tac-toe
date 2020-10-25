import React from 'react';

import './button-undo.css';
const ButtonReset = (props) => {
    return (
        <button className="button-undo" onClick={ props.handleClick }>Undo last move</button>
    )
}

export default ButtonReset;