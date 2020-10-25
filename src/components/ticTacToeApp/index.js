import React from 'react';

import { utilis } from '../utilis'
import './tic-tac-toe.css';
import { soundGame, soundEndGame } from '../../config';
import ListCells from '../ListCells';
import logo from '../../logo.png';
import ButtonTryAgan from '../ButtonTryAgain';
import ButtonReset from '../ButtonReset';
import ButtonUndo from '../ButtonUndo';
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
    handleClickCell = (i) => {
        const cells = [...this.state.cells];
        const winner = utilis.calculateWinner(this.state.cells);
        if (winner) {
            this.setState({ winner });
            return;
        }
        utilis.playSound(soundGame);
        cells[i] = this.state.isNext ? 'X' : 'O';
        this.setState({
            cells,
            isNext: !this.state.isNext,
            winner: winner,
            lastMove: i,
        }, () => {
            if (this.state.computerMode) setTimeout(this.handleComputerMove, 400);
        });
    }
    handleComputerMove = () => {
        const winner = utilis.calculateWinner(this.state.cells);
        if (winner) {
            this.setState({ winner });
            return;
        }
        const cells = [...this.state.cells];
        const computerMove = utilis.computerMove(this.state.cells);
        utilis.playSound(soundGame);
        cells[computerMove] = this.state.isNext ? 'X' : 'O';
        this.setState({ cells, isNext: !this.state.isNext, lastMoveComputer: computerMove })
    }
    handleIsComputerMode = (isComputerMode) => {
        this.setState({ isStart: !this.state.isStart, computerMode: isComputerMode });
    }
    handleChoosePlayer = (e, player) => {
        const isNext = (player === 'X');
        this.setState({ isNext, player });
    }
    handleClickButtonTryAgain = () => {
        this.setState({ cells: utilis.createArray(9), isNext: true, winner: '' })
        utilis.clearColorWinCells();
    }
    handleClickButtonReset = () => {
        this.setState({ cells: utilis.createArray(9), isNext: true, winner: '', isStart: true })
        utilis.clearColorWinCells();
    }
    handleClickButtonUndo = () => {
        const cells = [...this.state.cells];
        if (this.state.computerMode) {
            cells[this.state.lastMoveComputer] = null;
            cells[this.state.lastMove] = null;
            this.setState({ cells });
            return;
        }
        cells[this.state.lastMove] = null;
        this.setState({ cells, isNext: !this.state.isNext });
    }
    render() {
        const winner = utilis.calculateWinner(this.state.cells);
        const isFilledCells = utilis.checkArr(this.state.cells);
        if (winner) {
            utilis.colorWinCells(this.state.cells, winner.winnerCoord);
        }
        if (winner || isFilledCells) {
            utilis.playSound(soundEndGame);
        }
        return (
            <>
                {this.state.isStart && <ModalWindow
                    handleComputerMode={this.handleIsComputerMode}
                    handleChoosePlayer={this.handleChoosePlayer}
                    player={this.state.player} />}
                <div className="content">
                    <div className="logo-container">
                        <img className="logo" src={logo} alt="logo" />
                    </div>
                    <ButtonReset handleClick={this.handleClickButtonReset} />
                    {!winner && !utilis.checkArr(this.state.cells) && <ButtonUndo handleClick={this.handleClickButtonUndo} />}
                    <div className="main">
                        <ListCells
                            cells={this.state.cells}
                            handleClickCell={this.handleClickCell} />
                        {(winner || isFilledCells)
                            &&
                            (<div>
                                <div className="winner-message">
                                    Winner: {winner ? winner.winner : 'draw'}
                                </div>
                                <ButtonTryAgan handleClick={this.handleClickButtonTryAgain} />
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