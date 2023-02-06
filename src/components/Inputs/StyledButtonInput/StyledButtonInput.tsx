import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

export interface StyledButtonInputProps {
  actionInput: string;
  setActionInput: (value: React.SetStateAction<string>) => void;
  handleActionDispatchButtonClick: () => Promise<void>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 40,
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  fixedWidthContainer: {
    maxWidth: '48px',
    '&:hover': {
      backgroundColor: 'none',
    },
  },
  titleSpacing: {
    padding: '8px',
  },
  container: {
    display: 'flex',
    '&>div': {
      flexGrow: '1',
    },
  },
  button: {
    borderRadius: 4,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      color: '#FF9933',
      transform: 'scale(1.1)',
    },
  },
  input: {
    width: '270px',
  },
}));

export const StyledButtonInput = (props: StyledButtonInputProps) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.titleSpacing}>
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Action to be dispatched"
            value={props.actionInput}
            onChange={(event: any) => props.setActionInput(event.target.value)}
          />
        </div>

        <div className={classes.fixedWidthContainer}>
          <IconButton
            className={`${classes.button} MyCustomButton`}
            onClick={props.handleActionDispatchButtonClick}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
