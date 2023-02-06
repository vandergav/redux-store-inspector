import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Tab, Tabs, AppBar } from '@material-ui/core';
import StyledPagination from '../../Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
  };
}

function LinkTab(props: any) {
  return (
    <Tab
      style={{ textTransform: 'none', height: '24px' }}
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export function StyledNavTab({ content, lastIndex = 0 }: any) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      '& .MuiPaper-elevation4': {
        borderRadius: '4px',
      },
    },
    tabs: {
      backgroundColor: '#909090',
      minHeight: 38,
      textTransform: 'none',
      borderRadius: '4px',
      '& .MuiTabs-indicator': {
        height: 0,
      },
      '& .MuiTab-root.Mui-selected': {
        color: 'white',
        backgroundColor: '#FF9933',
      },
    },
    linkTabs: {
      minHeight: 38,
      '& .MuiTab-wrapper': {
        transition: 'all 0.3s ease-in-out',
      },
      '& .MuiTab-wrapper:hover': {
        transform: 'scale(1.1)',
      },
    },
  }));

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleChange = (event: any, newValue: any) => {
    setLoading(true);
    event.preventDefault();
    setValue(newValue);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    // <div className={classes.root} ref={customMenuRef}>
    <div className={classes.root}>
      <Paper>
        <Box>
          <AppBar position="static">
            <Tabs
              className={classes.tabs}
              variant="fullWidth"
              value={value}
              onChange={handleChange}
            >
              <LinkTab
                label="State Change"
                {...a11yProps(0)}
                className={classes.linkTabs}
              />
              <LinkTab
                label="Latest State"
                {...a11yProps(1)}
                className={classes.linkTabs}
              />
            </Tabs>
          </AppBar>
        </Box>
      </Paper>
      {loading ? (
        <div style={{ marginTop: '10px', marginBottom: '5px' }}>
          <Skeleton count={4.5} />
        </div>
      ) : (
        <>
          <TabPanel value={value} index={0}>
            {content && content.stateChange && (
              <StyledPagination
                data={content.stateChange.filter((el: any) => el != null)}
                lastIndex={lastIndex}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {content && content.currentState && (
              <StyledPagination
                data={content.currentState.filter((el: any) => el != null)}
                lastIndex={lastIndex}
              />
            )}
          </TabPanel>
        </>
      )}
    </div>
  );
}
