import React from 'react';
import './App.css';
import Board from './components/Board';
import BoardState from './context/board/BoardState';

const App = () => {
  return (
    <BoardState>
      <div className='App'>
        <header></header>
        <Board />
      </div>
    </BoardState>
  );
};

export default App;
