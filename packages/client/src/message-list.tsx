import { useEffect, useState } from 'react';
import { ws } from './index';
import { Message } from './message';
import styled from 'styled-components';

export interface Message {
  readonly id: string;
  readonly content: string;
  readonly created: string;
  readonly userId: string;
}

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 2em;
  width: 20em;
`;

export const MessageList = ({ userId }: { userId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getAllMessages() {
      const res = await fetch(`http://localhost:4000/messages`);
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as Message[];
      setMessages(response);
    }

    getAllMessages().catch((e) => console.log(e));
  }, []);

  ws.onmessage = (e) => {
    const msgObject = JSON.parse(e.data as string) as Message;
    setMessages([...messages, msgObject]);
  };

  return (
    <List>
      {messages.map((message) => (
        <Message message={message} myUserId={userId} />
      ))}
    </List>
  );
};
