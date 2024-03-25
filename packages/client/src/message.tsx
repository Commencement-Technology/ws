import { styled } from 'styled-components';
import { Message as MessageType } from './message-list';

const StyledTextMe = styled.p`
  background-color: lightcoral;
  border-radius: 1em;
  padding: 0.5em 1em;
  margin: 0.5em;
  margin-right: 4em;
`;

const StyledTextThem = styled.p`
  background-color: lightblue;
  border-radius: 1em;
  text-align: right;
  padding: 0.5em 1em;
  margin: 0.5em;
  margin-left: 4em;
`;

export const Message = ({ message, myUserId }: { message: MessageType; myUserId: string }) => {
  return (
    <>
      {message.userId === myUserId ? (
        <StyledTextMe key={message.id}>Me: {message.content}</StyledTextMe>
      ) : (
        <StyledTextThem key={message.id}>Them: {message.content}</StyledTextThem>
      )}
    </>
  );
};
