import React, { useState, useEffect, useContext } from 'react';
import Square from '../components/Square';
import BoardContext from '../context/board/BoardContext';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Board = () => {
  const boardContext = useContext(BoardContext);

  const {
    board,
    xTurn,
    resetBoard,
    playerEndGame,
    gameComplete,
    updateBoard
  } = boardContext;

  const [gameStatus, setGameStatus] = useState(' ');
  const [compPlay, setCompPlay] = useState(true);

  const renderSquare = i => {
    return <Square cell={i} xTurn={xTurn} />;
  };

  function isGameComplete() {
    if (
      (board[0] === board[1]) & (board[1] === board[2]) & (board[0] !== '') ||
      (board[3] === board[4]) & (board[3] === board[5]) & (board[3] !== '') ||
      (board[6] === board[7]) & (board[7] === board[8]) & (board[6] !== '') ||
      (board[0] === board[3]) & (board[0] === board[6]) & (board[0] !== '') ||
      (board[1] === board[4]) & (board[1] === board[7]) & (board[1] !== '') ||
      (board[2] === board[5]) & (board[2] === board[8]) & (board[2] !== '') ||
      (board[0] === board[4]) & (board[0] === board[8]) & (board[0] !== '') ||
      (board[6] === board[4]) & (board[6] === board[2]) & (board[6] !== '')
    ) {
      return 'WIN';
    } else {
      let tie = true;
      board.forEach(element => (element === '' ? (tie = false) : null));
      if (tie) {
        return 'TIE';
      } else {
        return 'RESUME';
      }
    }
  }

  const hasPlayerWon = () => {
    let game = isGameComplete();
    if (game === 'WIN') {
      playerEndGame();
      !xTurn
        ? setGameStatus('Player X Wins !')
        : setGameStatus('Player O Wins !');
    } else if (game === 'TIE') {
      playerEndGame();
      setGameStatus('Draw');
    } else {
      if (xTurn) {
        setGameStatus('Player X Turn');
      } else {
        setGameStatus('Player O Turn');
        // computer's turn
        if (!gameComplete & compPlay) compTurn();
      }
    }
  };

  const compTurn = () => {
    let comp = Math.floor(Math.random() * 9);
    while (board[comp] !== '') {
      comp = Math.floor(Math.random() * 9);
    }
    updateBoard(comp);
  };

  const handleChange = event => {
    resetGame();
    setCompPlay(event.target.checked);
  };

  const resetGame = () => {
    resetBoard();
    setGameStatus('Player X Turn');
  };

  useEffect(() => {
    if (!gameComplete) hasPlayerWon();
    // eslint-disable-next-line
  }, [xTurn, gameComplete]);

  return (
    <div>
      <Container className='game'>
        <div className='menu'>
          <h3>{gameStatus}</h3>
          <Button variant='contained' color='primary' onClick={resetGame}>
            Restart
          </Button>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={compPlay}
              color='primary'
              onChange={handleChange}></Checkbox>
          }
          label='O is Computer'
        />
        <div className='board'>
          <div className='board-row'>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className='board-row'>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className='board-row'>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Board;
