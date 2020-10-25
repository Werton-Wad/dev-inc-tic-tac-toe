import React from 'react';

import './cell.css';

const Cell = (props) => {
    const { handleClickCell, number, cells } = props;
    const handleClick = (e) => {
        if (!e.target.textContent) {
            handleClickCell(number);
        }
    }
    return (
        <div className='cell' onClick={handleClick}>
                <div className="cell-content">
               {cells[number]}
            </div>
        </div>
    )
}

export default Cell;