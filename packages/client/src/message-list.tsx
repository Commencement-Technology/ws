/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { ws } from './index';

export interface Message {
  readonly id: string;
  readonly content: string;
}

export const MessageList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getMessages() {
      console.log('fetching messages...');
      const response = await fetch('http://localhost:4000/messages');
      const messages = (await response.json()) as Message[];
      setMessages(messages);
    }

    if (loading) getMessages().catch((e) => console.log('CATCH ERROR: ', e));
    setLoading(false);
  }, [loading]);

  ws.onmessage = function incoming() {
    console.log('MESSAGE INCOMING...');
    setLoading(true);
  };

  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message.content}</li>
      ))}
    </ul>
  );
};
