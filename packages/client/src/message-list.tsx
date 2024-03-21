import { useEffect, useState } from 'react';
import { ws } from './index';

export interface Message {
  readonly id: string;
  readonly content: string;
  readonly created: string;
  readonly userId?: number;
}

export const MessageList = () => {
  // const [fetchMessages, setFetchMessages] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getAllMessages() {
      console.log('FETCHING ALL MESSAGES...');
      const res = await fetch(`http://localhost:4000/messages`);
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as Message[];
      return response;
      setMessages(response);
    }

    // async function getLatestMessages(latestLocalMessage: Message) {
    //   console.log('FETCHING LATEST MESSAGES...', latestLocalMessage?.created);
    //   const response = await fetch(
    //     `http://localhost:4000/messages?latest=${Math.floor(new Date(latestLocalMessage.created).getTime() / 1000)}`,
    //   );
    //   const messageResponse = (await response.json()) as Message[];
    //   setMessages([...messages, ...messageResponse.slice(1)]);
    //   setRefetch(false);
    // }
    // if (messages.length && refetch) {
    //   getLatestMessages(messages[messages.length - 1]).catch((e) =>
    //     console.log('CATCH ERROR IN LATEST: ', e),
    //   );
    getAllMessages().catch((e) => console.log(e));
  }, []);

  ws.onmessage = function incoming(e) {
    console.log('MESSAGE INCOMING...');
    if (e.data.toString() === 'refetch') {
      // setFetchMessages(true);
    }
  };

  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message.content}</li>
      ))}
    </ul>
  );
};
