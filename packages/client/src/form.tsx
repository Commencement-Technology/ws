import { FormEvent, useState } from 'react';
import { ws } from './index';
import { v4 as uuid } from 'uuid';

const createMessage = (input: string) => ({
  id: uuid(),
  content: input,
  created: new Date().toISOString(),
});

export const Form = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = createMessage(input);
    ws.send(JSON.stringify(messageToSend));
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};
