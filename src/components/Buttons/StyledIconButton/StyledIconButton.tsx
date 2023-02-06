import React, { ReactNode } from 'react';
import { StyleProps } from '../styles';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';

interface Props extends StyleProps {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    scale: 1.1,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      color: '#FF9933',
      transform: 'scale(1.1)',
    },
  },
}));

export const StyledIconButton = ({ children, onClick, ...props }: Props) => {
  const classes = useStyles(props);
  return (
    <IconButton
      className={'MyCustomButton'}
      onClick={onClick}
      classes={{
        root: classes.root,
      }}
    >
      {children || null}
    </IconButton>
  );
};
