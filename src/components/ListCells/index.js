import React from 'react'

import Cell from '../Cell';
import '../Cell/cell.css';
import './list-cells.css';

const ListCells = (props) => {
    let id = 0;
    const { handleClickCell, cells, listCellsRef } = props;
    return (
        <div className="list-cells" ref={listCellsRef} >
            { cells.map((_, i) => <Cell key={++id}
                number={i}
                handleClickCell={handleClickCell}
                cells={cells}
            />) }
        </div>
    )
}

export default ListCells;