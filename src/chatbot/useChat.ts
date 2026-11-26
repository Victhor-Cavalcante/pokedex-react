import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MAX_HISTORY_ITEMS,
  MAX_MESSAGE_LENGTH,
} from './config';
import { sendMessage } from './chatApi';
import type { ChatMessage } from './types';

interface FailedRequest {
  message: string;
  history: ChatMessage[];
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const failedRequestRef = useRef<FailedRequest | null>(null);
  const requestInProgressRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const updateMessages = useCallback((nextMessages: ChatMessage[]) => {
    messagesRef.current = nextMessages;
    setMessages(nextMessages);
  }, []);

  const runRequest = useCallback(
    async (message: string, history: ChatMessage[]) => {
      if (requestInProgressRef.current) {
        return;
      }

      requestInProgressRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const reply = await sendMessage(message, history);
        if (!mountedRef.current) {
          return;
        }

        updateMessages([
          ...messagesRef.current,
          { role: 'assistant', content: reply },
        ]);
        failedRequestRef.current = null;
      } catch (caughtError) {
        if (!mountedRef.current) {
          return;
        }

        const messageText =
          caughtError instanceof Error
            ? caughtError.message
            : 'Não foi possível obter a resposta. Tente novamente.';
        setError(messageText);
        failedRequestRef.current = { message, history };
      } finally {
        requestInProgressRef.current = false;
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [updateMessages],
  );

  const send = useCallback(
    (text: string) => {
      if (
        requestInProgressRef.current ||
        !text.trim() ||
        text.length > MAX_MESSAGE_LENGTH
      ) {
        return;
      }

      const history = messagesRef.current
        .filter((item) => item.role === 'user' || item.role === 'assistant')
        .slice(-MAX_HISTORY_ITEMS)
        .map((item) => ({
          role: item.role,
          content: item.content.slice(0, MAX_MESSAGE_LENGTH),
        }));

      updateMessages([...messagesRef.current, { role: 'user', content: text }]);
      failedRequestRef.current = null;
      void runRequest(text, history);
    },
    [runRequest, updateMessages],
  );

  const retry = useCallback(() => {
    const failedRequest = failedRequestRef.current;
    if (!failedRequest || requestInProgressRef.current) {
      return;
    }

    void runRequest(failedRequest.message, failedRequest.history);
  }, [runRequest]);

  return { messages, isLoading, error, send, retry };
}
