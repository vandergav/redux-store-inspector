import { WindowMessage } from './types';

console.log('<----- Injected script started running ----->');

// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#host-page-communication

let compareStateArray = Array(2).fill({});

setInterval(async () => {
  let internalRoot = getInternalRoot();
  let state = getStateFromInternalRoot(internalRoot);
  try {
    await updateCompareStateArray(state);
    let stateChange = findDifferenceObject(
      compareStateArray[0],
      compareStateArray[1]
    );
    !isEmpty(stateChange) &&
      window.postMessage({
        type: 'INJECT_SCRIPT_SET_STATE_CHANGE',
        content: JSON.stringify({
          stateChange,
          currentState: compareStateArray[1],
        }),
      });
  } catch (error) {
    console.log(error);
  }
}, 100);

const getInternalRoot = () =>
  Array.from(document.querySelectorAll<any>('*[id]')).find(
    (el) => el?._reactRootContainer?._internalRoot?.current
  )?._reactRootContainer?._internalRoot?.current;

const getStateFromInternalRoot = (internalRoot: any) =>
  (
    internalRoot?.pendingProps?.store ||
    internalRoot?.stateNode?.store ||
    internalRoot?.memoizedState?.element?.props?.store
  )?.getState?.();

const getStoreFromInternalRoot = (internalRoot: any) =>
  internalRoot?.memoizedState?.element?.props?.store;

const updateCompareStateArray = (latestState: {}) => {
  new Promise<void>((resolve, reject) => {
    try {
      compareStateArray.push(latestState); // latest at second index
      compareStateArray.shift(); // previous at first index
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const findDifferenceObject = (
  main: { [x: string]: any },
  compareWith: { [x: string]: any }
) => {
  const result: any = {};
  Object.keys(main).forEach((r) => {
    const element = main[r];
    if (compareWith[r]) {
      if (element !== compareWith[r]) {
        result[r] = compareWith[r];
      }
    }
  });
  return result;
};

function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

window.addEventListener(
  'message',
  async ({ source, data: { type, content } }: WindowMessage) => {
    // only accept messages from the current tab
    if (source != window) return;
    if (type && type == 'CONTENT_SCRIPT_DISPATCH_ACTION') {
      let internalRoot = getInternalRoot();
      getStoreFromInternalRoot(internalRoot)?.dispatch({ type: `${content}` });
    }
  },
  false
);
