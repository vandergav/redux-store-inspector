// const getPriceText = () => {
//   const tag = document.querySelector('div.ds-summary-row h4 span') as HTMLSpanElement;
//   return tag?.innerText ?? "No data";
// }

// const getRentText = () => {
//   const tag = document.querySelector('div#ds-rental-home-values div.ds-expandable-card-section-default-padding div div span') as HTMLSpanElement;
//   return tag?.innerText ?? "No data";
// }

// chrome.runtime.onMessage.addListener((msg, sender, callback) => {
//   callback(`Price: ${getPriceText()}\nRent: ${getRentText()}`);
// });

import { Message, WindowMessage } from './types';

console.log('<----- Content script started running ----->');

function injectScript(file_path: string, tag: string) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

injectScript(chrome.extension.getURL('injectscript.js'), 'body');

window.addEventListener(
  'message',
  async ({ source, data: { type, content } }: WindowMessage) => {
    // only accept messages from the current tab
    if (source != window) return;

    if (type && type == 'INJECT_SCRIPT_SET_STATE_CHANGE') {
      chrome.runtime.sendMessage(
        { content, type: 'CONTENT_SCRIPT_SET_STATE_CHANGE' },
        (response) => {}
      );
    }
  },
  false
);

chrome.runtime.onMessage.addListener(
  async ({ content, type }: Message, sender, sendResponse) => {
    switch (type) {
      case 'BACKGROUND_SCRIPT_DISPATCH_ACTION':
        try {
          window.postMessage({
            type: 'CONTENT_SCRIPT_DISPATCH_ACTION',
            content,
          });
          console.log(content);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'XXY':
        try {
          console.log(content);
        } catch (error) {
          console.error(error);
        }
        break;
      default:
      // code block
    }
  }
);
