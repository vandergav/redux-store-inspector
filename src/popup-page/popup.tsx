import React, { FC, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Box, Grid, Paper } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import 'fontsource-roboto';
import './popup.css';
import {
  clearAllStorageData,
  getAllStorageData,
  getStorageData,
  setStorageData,
} from '../utils/storage';
import { StorageDataKeys } from '../constants';
import StyledTextButton from '../components/Buttons/StyledTextButton';
import StyledIconButton from '../components/Buttons/StyledIconButton';
import StyledButtonInput from '../components/Inputs/StyledButtonInput';
import StyledNavTab from '../components/Tabs/StyledNavTabs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IProps {}

export const Popup: FC<IProps> = () => {
  const [content, setContent] = useState<any>({});
  const [actionInput, setActionInput] = useState<string>('');
  const [lastIndex, setlastIndex] = useState<any>(0);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      await getAllDataFromStorage();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { prevStateChange = null } = await getStorageData(
        StorageDataKeys.prevStateChange
      );
      if (prevStateChange) {
        const prevFirstElement = prevStateChange[0];
        const lastIndex = content?.stateChange?.findIndex(
          (x: Object[]) =>
            JSON.stringify(x) === JSON.stringify(prevFirstElement)
        );
        setlastIndex(lastIndex);
      }
    })();
  }, [content]);

  const handleGetStateChangeButtonClick = async () => {
    await getAllDataFromStorage();
  };

  const handleActionDispatchButtonClick = async () => {
    if (actionInput === '') {
      return;
    }
    setLoading(true);
    await chrome.runtime.sendMessage(
      {
        content: actionInput,
        type: 'POPUP_DISPATCH_ACTION',
      },
      () => {
        setActionInput('');
        setTimeout(getAllDataFromStorage, 300);
      }
    );
    setTimeout(() => setLoading(false), 500);
  };

  const handleClearButtonClick = async () => {
    setLoading(true);
    try {
      await clearAllStorageData();
      setContent({});
      setlastIndex(11); // Only max 10 elements in the array of stateChanges, and since lastIndex and lesser becomes orange, 11 guarantees that all next stateChanges will be orange
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => setLoading(false), 500);
  };

  const getAllDataFromStorage = async () => {
    setLoading(true);
    try {
      content?.stateChange &&
        (await setStorageData({ prevStateChange: content.stateChange }));
      let { allData } = await getStorageData(StorageDataKeys.allData);
      allData && setContent(allData);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Box mx="8px" my="16px">
      <Grid container style={{ width: '105%' }}>
        <Grid item xs={9}>
          <Paper>
            <Box pl="15px">
              <StyledButtonInput
                actionInput={actionInput}
                setActionInput={setActionInput}
                handleActionDispatchButtonClick={
                  handleActionDispatchButtonClick
                }
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={1} />
        <Grid item justify="flex-end">
          <Paper>
            <Box>
              <StyledIconButton
                onClick={handleGetStateChangeButtonClick}
                height="48px"
              >
                <RefreshIcon />
              </StyledIconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box height="16px" />
      <Paper>
        <Box p="5px">
          {loading ? (
            <Skeleton count={4.5} />
          ) : (
            <StyledNavTab content={content} lastIndex={lastIndex} />
          )}
        </Box>
      </Paper>
      <Box height="16px" />
      {Object.keys(content).length > 0 && (
        <Paper style={{ display: 'inline-block' }}>
          <Box>
            <StyledTextButton onClick={handleClearButtonClick}>
              Clear
            </StyledTextButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

render(<Popup />, document.getElementById('popup'));
