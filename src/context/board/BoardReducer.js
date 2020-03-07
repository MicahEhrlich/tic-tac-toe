import { RESET_BOARD, NEXT_TURN, UPDATE_BOARD, END_GAME } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case RESET_BOARD:
      return {
        ...state,
        board: ['', '', '', '', '', '', '', '', ''],
        xTurn: true,
        gameComplete: false
      };
    case NEXT_TURN:
      return {
        ...state,
        xTurn: action.payload
      };
    case UPDATE_BOARD:
      return {
        ...state,
        board: action.payload
      };
    case END_GAME:
      return {
        ...state,
        gameComplete: true
      };

    default:
      return state;
  }
};
