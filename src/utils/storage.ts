import { ChromeStorage } from '../types';

export const getStorageData = (key: String): Promise<ChromeStorage> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

export const getAllStorageData = (): Promise<ChromeStorage> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(null, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

export const setStorageData = (data: any): Promise<void> =>
  new Promise((resolve, reject) => {
    chrome.storage.local.set(data, () => {
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve();
    });
  });

export const clearAllStorageData = () =>
  new Promise<void>((resolve, reject) =>
    chrome.storage.local.clear(() =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  );
