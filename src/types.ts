export interface Message {
  type: string;
  content: string;
}

export interface WindowMessage {
  source: MessageEventSource | null;
  data: Message;
}

export interface ChromeStorage {
  allData?: allData;
  prevStateChange?: Object[];
}

// export type ChromeStorage = {
//   [key in ChromeStorageKey]?: {};
// };

// export type ChromeStorageKey = 'allData';

type allData = { stateChange: Array<number>; currentState: Array<number> };
