import React, { ReactNode } from 'react';
import { StyleProps, useStyles } from '../styles';
import Button from '@material-ui/core/Button';

interface Props extends StyleProps {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const StyledTextButton = ({ children, onClick, ...props }: Props) => {
  const classes = useStyles(props);
  return (
    <Button
      onClick={onClick}
      classes={{
        root: classes.root,
      }}
    >
      {children || null}
    </Button>
  );
};
