import React from 'react';

import './button.css';

const Button = ({ handleClick, buttonName }) => {
    return (
        <button className="button" onClick={handleClick}>{buttonName}</button>
    )
}

export default Button;