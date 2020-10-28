import React from 'react';

import { utilis } from '../utilis'
import './tic-tac-toe.css';
// import '../Cell/cell.css';
import { soundGame, soundEndGame } from '../../config';
import ListCells from '../ListCells';
import logo from '../../logo.png';
import Button from '../Button';
import ModalWindow from '../StartMenu';

class TicTacToeApp extends React.Component {
    state = {
        cells: utilis.createArray(9),
        isNext: true,
        winner: '',
        isStart: true,
        lastMove: null,
        lastMoveComputer: null,
        computerMode: false,
        player: 'X',
    }
    listCellsRef = React.createRef();
    handleClickCell = (i) => {
        const { cells, isNext, computerMode } = this.state;
        const copyCells = [...cells];
        const winner = utilis.calculateWinner(cells);
        if (winner) {
            this.setState({ winner });
            return;
        }
        utilis.playSound(soundGame);
        copyCells[i] = isNext ? 'X' : 'O';
        this.setState({
            cells: copyCells,
            isNext: !isNext,
            winner: winner,
            lastMove: i,
        }, () => {
            if (computerMode) setTimeout(this.handleComputerMove, 400);
        });
    }
    handleComputerMove = () => {
        const { cells, isNext } = this.state;
        const winner = utilis.calculateWinner(cells);
        if (winner) {
            this.setState({ winner });
            return;
        }
        const copyCells = [...cells];
        const computerMove = utilis.computerMove(cells);
        utilis.playSound(soundGame);
        copyCells[computerMove] = isNext ? 'X' : 'O';
        this.setState({ cells: copyCells, isNext: isNext, lastMoveComputer: computerMove })
    }
    handleIsComputerMode = (isComputerMode) => () => {
        this.setState({ isStart: !this.state.isStart, computerMode: isComputerMode });
    }
    handleChoosePlayer = (e) => {
        const isNext = (e.target.value === 'X');
        this.setState({ isNext, player: e.target.value });
    }
    handleClickTryAgain = () => {
        this.setState({ cells: utilis.createArray(9), isNext: true, winner: '' })
        this.clearColorWinCells();
    }
    handleClickReset = () => {
        this.setState({ cells: utilis.createArray(9), isNext: true, winner: '', isStart: true })
        this.clearColorWinCells();
    }
    handleClickUndo = () => {
        const { cells, lastMove, lastMoveComputer, computerMode, isNext } = this.state;
        const copyCells = [...cells];
        if (computerMode) {
            copyCells[lastMoveComputer] = null;
            copyCells[lastMove] = null;
            this.setState({ cells: copyCells });
            return;
        }
        copyCells[lastMove] = null;
        this.setState({ cells: copyCells, isNext: !isNext });
    }
    colorWinCells = (cells, winner) => {
        const $cells = this.listCellsRef.current.children;
        cells.forEach((_, i) => {
            if (winner.includes(i)) {
                $cells[i].classList.add('cell-win');
            }
        })
    }
    clearColorWinCells = () => {
        const $cells = this.listCellsRef.current.children;
        for (let i = 0; i < $cells.length; i++) {
            if ($cells[i].classList.contains('cell-win')) {
                $cells[i].classList.remove('cell-win');
            }
        }
    }
    render() {
        const { cells, player, isStart } = this.state;
        const winner = utilis.calculateWinner(cells);
        const isFilledCells = utilis.checkArr(cells);
        if (winner) {
            this.colorWinCells(cells, winner.winnerCoord);
        }
        if (winner || isFilledCells) {
            utilis.playSound(soundEndGame);
        }
        return (
            <>
                {isStart && <ModalWindow
                    handleComputerMode={this.handleIsComputerMode}
                    handleChoosePlayer={this.handleChoosePlayer}
                    player={player} />}
                <div className="content">
                    <div className="logo-container">
                        <img className="logo" src={logo} alt="logo" />
                    </div>
                    <Button handleClick={this.handleClickReset} buttonName="reset" />
                    {!winner && !utilis.checkArr(cells) && <Button handleClick={this.handleClickUndo} buttonName="undo last move" />}
                    <div className="main">
                        <ListCells
                            cells={cells}
                            handleClickCell={this.handleClickCell}
                            listCellsRef={this.listCellsRef} />
                        {(winner || isFilledCells)
                            &&
                            (<div>
                                <div className="winner-message">
                                    Winner: {winner ? winner.winner : 'draw'}
                                </div>
                                <Button handleClick={this.handleClickTryAgain} buttonName="try again" />
                            </div>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default TicTacToeApp;