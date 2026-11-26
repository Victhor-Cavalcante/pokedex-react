import type { ChatMessage } from './types';

export async function sendMockMessage(
  message: string,
  _history: ChatMessage[],
): Promise<string> {
  const normalizedMessage = message.toLocaleLowerCase('pt-BR');

  if (normalizedMessage.includes('erro')) {
    await delay(1000 + Math.floor(Math.random() * 1001));
    throw new Error('Mock: falha simulada.');
  }

  if (normalizedMessage.includes('demora')) {
    await delay(8000);
  } else {
    await delay(1000 + Math.floor(Math.random() * 1001));
  }

  return `Resposta simulada: recebi sua mensagem '${message}'.`;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
