import { Message } from './types';
import { getStorageData, setStorageData } from './utils/storage';
import { StorageDataKeys } from './constants';

const updateLatest = (array: any, add: any) => {
  array.unshift(add);
  return array.slice(0, 10);
};

chrome.runtime.onMessage.addListener(
  async ({ content, type }: Message, sender, sendResponse) => {
    switch (type) {
      case 'CONTENT_SCRIPT_SET_STATE_CHANGE':
        try {
          const allData = JSON.parse(content);
          let {
            allData: { stateChange = Array(10), currentState = Array(10) } = {},
          } = await getStorageData(StorageDataKeys.allData);
          stateChange = updateLatest(stateChange, allData.stateChange);
          currentState = updateLatest(currentState, allData.currentState);
          await setStorageData({ allData: { stateChange, currentState } });
          sendResponse();
        } catch (error) {
          console.error(error);
          sendResponse(error);
        }
        break;
      case 'POPUP_DISPATCH_ACTION':
        try {
          // https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let id = tabs[0]?.id as any; // The as any syntax is called a type assertion and effectively turns off type checking for the specific parameter. https://bobbyhadz.com/blog/typescript-no-overload-matches-this-call
            chrome.tabs.sendMessage(
              id,
              { content, type: 'BACKGROUND_SCRIPT_DISPATCH_ACTION' },
              (response) => {
                console.log(response);
              }
            );
          });
        } catch (error) {
          console.error(error);
          sendResponse(error);
        }
        break;
      default:
      // code block
    }
  }
);
