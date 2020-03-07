import React, { useContext } from 'react';
import BoardContext from '../context/board/BoardContext';
import Button from '@material-ui/core/Button';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import Fade from '@material-ui/core/Fade';

const Square = props => {
  const { cell } = props;
  const boardContext = useContext(BoardContext);
  const { updateBoard, gameComplete, board } = boardContext;

  const onClickSquare = () => {
    if (!gameComplete & (board[cell] === '')) updateBoard(cell);
  };

  const getSquareIcon = () => {
    if (board[cell] === 'X') {
      return (
        <Fade in={true}>
          <CloseIcon
            fontSize='large'
            color='primary'
            style={{ fontSize: 40 }}
          />
        </Fade>
      );
    } else if (board[cell] === 'O') {
      return (
        <Fade in={true}>
          <RadioButtonUncheckedIcon
            fontSize='large'
            color='primary'
            style={{ fontSize: 40 }}
          />
        </Fade>
      );
    } else
      return <Icon fontSize='large' color='primary' style={{ fontSize: 40 }} />;
  };

  return (
    <div className='square'>
      <Button onClick={onClickSquare}>{getSquareIcon()}</Button>
    </div>
  );
};

export default Square;
