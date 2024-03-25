import { Message as MessageType } from './message-list';

export const Message = ({ message, myUserId }: { message: MessageType; myUserId: string }) => {
  return (
    <>
      {message.userId === myUserId ? (
        <li key={message.id} style={{ color: 'red', padding: '0.5em 1em' }}>
          Me: {message.content}
        </li>
      ) : (
        <li key={message.id} style={{ color: 'blue', textAlign: 'right', padding: '0.5em 1em' }}>
          Them: {message.content}
        </li>
      )}
    </>
  );
};
