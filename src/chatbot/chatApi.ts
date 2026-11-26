import {
  CHAT_API_URL,
  CHAT_USE_MOCK,
  REQUEST_TIMEOUT_MS,
} from './config';
import { sendMockMessage } from './mockChatApi';
import type {
  ChatError,
  ChatMessage,
  ChatRequest,
  ChatResponse,
} from './types';

const GENERIC_ERROR = 'Não foi possível obter a resposta. Tente novamente.';
const NETWORK_ERROR =
  'Não consegui falar com o servidor. Tente novamente em instantes.';
const TIMEOUT_ERROR = 'A resposta demorou demais. Tente novamente.';

export function sendMessage(
  message: string,
  history: ChatMessage[],
): Promise<string> {
  if (CHAT_USE_MOCK) {
    return sendMockMessage(message, history);
  }

  return sendBackendMessage(message, history);
}

async function sendBackendMessage(
  message: string,
  history: ChatMessage[],
): Promise<string> {
  if (!CHAT_API_URL) {
    throw new Error(NETWORK_ERROR);
  }

  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const request: ChatRequest = { message, history };

  try {
    let response: Response;

    try {
      response = await fetch(`${CHAT_API_URL.replace(/\/+$/, '')}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
    } catch {
      throw new Error(timedOut ? TIMEOUT_ERROR : NETWORK_ERROR);
    }

    if (!response.ok) {
      const body = await readJson<ChatError>(response, controller.signal);
      throw new Error(
        body && typeof body.error === 'string' && body.error
          ? body.error
          : GENERIC_ERROR,
      );
    }

    const body = await readJson<ChatResponse>(response, controller.signal);
    if (!body || typeof body.reply !== 'string') {
      throw new Error(GENERIC_ERROR);
    }

    return body.reply;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function readJson<T>(
  response: Response,
  signal: AbortSignal,
): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch (caughtError) {
    if (signal.aborted) {
      throw new Error(TIMEOUT_ERROR);
    }

    if (caughtError instanceof SyntaxError) {
      return null;
    }

    throw new Error(NETWORK_ERROR);
  }
}
