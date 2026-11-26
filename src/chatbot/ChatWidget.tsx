import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  Box,
  Button,
  Fab,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MAX_MESSAGE_LENGTH } from './config';
import type { ChatMessage } from './types';
import { useChat } from './useChat';
import './chatbot.css';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, isLoading, error, send, retry } = useChat();
  const theme = useTheme();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const submit = () => {
    if (isLoading || !draft.trim() || draft.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    send(draft);
    setDraft('');
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <>
      {isOpen ? (
        <Paper
          className="chat-panel"
          elevation={12}
          role="dialog"
          aria-label="Assistente DexLab"
          sx={{ zIndex: theme.zIndex.fab }}
        >
          <Box className="chat-header">
            <Box>
              <Typography component="h2" className="chat-title">
                Assistente DexLab
              </Typography>
              <Typography className="chat-subtitle">
                Tire suas dúvidas sobre Pokémon
              </Typography>
            </Box>
            <IconButton
              aria-label="Fechar conversa"
              onClick={() => setIsOpen(false)}
              className="chat-icon-button"
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <MessageList
            messages={messages}
            isLoading={isLoading}
            error={error}
            onRetry={retry}
          />

          <Box className="chat-compose">
            <TextField
              inputRef={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Escreva sua mensagem..."
              aria-label="Mensagem"
              multiline
              maxRows={4}
              disabled={isLoading}
              fullWidth
              size="small"
              className="chat-text-field"
              slotProps={{
                htmlInput: { maxLength: MAX_MESSAGE_LENGTH },
              }}
            />
            <IconButton
              aria-label="Enviar mensagem"
              onClick={submit}
              disabled={
                isLoading ||
                !draft.trim() ||
                draft.length > MAX_MESSAGE_LENGTH
              }
              className="chat-send-button"
            >
              <SendIcon />
            </IconButton>
            <Typography className="chat-counter" aria-live="polite">
              {draft.length}/{MAX_MESSAGE_LENGTH}
            </Typography>
          </Box>
        </Paper>
      ) : null}

      <Fab
        color="primary"
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
        onClick={() => setIsOpen((open) => !open)}
        className="chat-fab"
        sx={{ zIndex: theme.zIndex.fab }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
}

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

function MessageList({
  messages,
  isLoading,
  error,
  onRetry,
}: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages, isLoading, error]);

  return (
    <Box
      className="chat-messages"
      ref={listRef}
      role="log"
      aria-label="Mensagens da conversa"
      aria-live="polite"
    >
      {messages.length === 0 ? (
        <MessageBubble
          message={{
            role: 'assistant',
            content: 'Oi! Pergunte sobre Pokémon ou sobre o DexLab.',
          }}
        />
      ) : null}
      {messages.map((message, index) => (
        <MessageBubble key={`${message.role}-${index}`} message={message} />
      ))}
      {isLoading ? <TypingIndicator /> : null}
      {error ? (
        <Box className="chat-error">
          <Typography className="chat-error-text">{error}</Typography>
          <Button size="small" onClick={onRetry} className="chat-retry-button">
            Tentar novamente
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <Box className={`chat-message chat-message-${message.role}`}>
      <Typography component="p" className="chat-bubble">
        {message.content}
      </Typography>
    </Box>
  );
}

function TypingIndicator() {
  return (
    <Box className="chat-message chat-message-assistant">
      <Box className="chat-typing" role="status" aria-label="Digitando">
        <span />
        <span />
        <span />
      </Box>
    </Box>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="chat-svg-icon">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-1 12H5v-2h14Zm0-4H5V8h14Zm0-4H5V4h14Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="chat-svg-icon">
      <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="chat-svg-icon">
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}
