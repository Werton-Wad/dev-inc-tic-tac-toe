import React from 'react';

import './modal-window.css';

const ModalWindow = (props) => {
    const { handleComputerMode, handleChoosePlayer, player } = props;
    return (
        <>
            <div className="modal-window-overlay"></div>
            <div className="modal-window">
                <div>
                    Choose your player:
                    <span className="players">
                        <label className={player === 'X' ? "active-player" : ''} htmlFor="checkX">X</label>
                        <input type="radio" name="player" value='X' id="checkX" onChange={(e) => handleChoosePlayer(e, e.target.value)} />
                        <label className={player === 'O' ? "active-player" : ''} htmlFor="checkO">O</label>
                        <input type="radio" name="player" value='O' id="checkO" onChange={(e) => handleChoosePlayer(e, e.target.value)} />
                    </span>
                </div>
                <div className="playmode" onClick={() => handleComputerMode(true)}>
                    Play with computer
                    </div>
                <div className="playmode" onClick={() => handleComputerMode(false)}>
                    Multiplayer
                    </div>
            </div>
        </>
    );
}

export default ModalWindow;
