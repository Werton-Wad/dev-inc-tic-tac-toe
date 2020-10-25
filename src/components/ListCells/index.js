import React from 'react'

import Cell from '../Cell';
import '../Cell/cell.css';
import './list-cells.css';

const ListCells = (props) => {
    const { handleClickCell, cells } = props;
    return (
        <div className="list-cells" >
            { cells.map((_, i) => <Cell key={i}
                number={i}
                handleClickCell={handleClickCell}
                cells={cells}
            />)}
        </div>
    )
}

export default ListCells;