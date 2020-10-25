import React from 'react';

import './button-reset.css';
const ButtonReset = (props) => {
    return (
        <button className="button-reset" onClick={ props.handleClick }>reset</button>
    )
}

export default ButtonReset;