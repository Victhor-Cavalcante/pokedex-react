export const MAX_MESSAGE_LENGTH = 500;
export const MAX_HISTORY_ITEMS = 10;
export const REQUEST_TIMEOUT_MS = 30000;

const mockSetting = import.meta.env.VITE_CHAT_USE_MOCK;

export const CHAT_USE_MOCK =
  mockSetting === undefined ? true : mockSetting === 'true';
export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL;
