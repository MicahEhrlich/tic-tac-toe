import React, { useReducer } from 'react';
import BoardReducer from './BoardReducer';
import boardContext from './BoardContext';
import { RESET_BOARD, NEXT_TURN, UPDATE_BOARD, END_GAME } from '../../types';

const BoardState = props => {
  const initialState = {
    board: ['', '', '', '', '', '', '', '', ''],
    xTurn: true,
    gameComplete: false
  };

  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const resetBoard = () => dispatch({ type: RESET_BOARD });

  const nextTurn = () => dispatch({ type: NEXT_TURN, payload: !state.xTurn });

  const updateBoard = i => {
    let board = state.board;
    state.xTurn ? (board[i] = 'X') : (board[i] = 'O');
    dispatch({ type: UPDATE_BOARD, payload: board });
    nextTurn();
  };

  const playerEndGame = () => dispatch({ type: END_GAME });

  return (
    <boardContext.Provider
      value={{
        ...state,
        resetBoard,
        updateBoard,
        playerEndGame
      }}>
      {props.children}
    </boardContext.Provider>
  );
};

export default BoardState;
