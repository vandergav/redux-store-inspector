import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const base = {
  background: '#909090',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 36,
  padding: '0 30px',
  boxShadow:
    '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
};

export const ClearButton = withStyles({
  root: {
    ...base,
    '&:hover': {
      background: '#f00',
    },
  },
})(Button);

export const RefreshButton = withStyles({
  root: {
    ...base,
    height: 48,
    padding: 0,
    '&:hover': {
      backgroundColour: 'transparent',
    },
  },
})(Button);

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 40,
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  fixedWidthContainer: {
    maxWidth: '240px',
    backgroundColor: 'red',
  },
  titleSpacing: {
    marginRight: theme.spacing(2),
  },
  container: {
    display: 'flex',
    '&>div': {
      flexGrow: '1',
    },
  },
}));

export const AdminBar = () => {
  const classes = useStyles();

  return (
    <div>
      {/* <Grid container className={classes.root}>
        <Grid item xs={3} className={classes.fixedWidthContainer}>
          <Typography variant="body2">Title: MyTitle</Typography>
        </Grid>
        <Grid item style={{ flexGrow: '1' }}>
          <Typography
            className={classes.titleSpacing}
            variant="body2"
            component="span"
          >
            Some stuff to go on the left
          </Typography>
        </Grid>
        <Grid xs={3} item className={classes.fixedWidthContainer}>
          Some stuff to go on the right
        </Grid>
      </Grid> */}

      {/* Without grid method */}
      <div className={classes.container}>
        <div className={classes.fixedWidthContainer}>
          <Typography variant="body2">Title: MyTitle</Typography>
        </div>
        <div>
          <Typography
            className={classes.titleSpacing}
            variant="body2"
            component="span"
          >
            Some stuff to go on the left
          </Typography>
        </div>
        <div className={classes.fixedWidthContainer}>
          Some stuff to go on the right
        </div>
      </div>
    </div>
  );
};
