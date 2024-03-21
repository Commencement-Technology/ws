import { useState } from 'react';
import { ws } from './index';

export const Form = () => {
  const [input, setInput] = useState('');

  const handleClick = async () => {
    const data = { message: input };
    if (!input) return;
    await fetch('http://localhost:4000/message/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    ws.send('new');
    setInput('');
  };

  return (
    <div>
      <label htmlFor="message">Message:</label>
      <input
        type="text"
        id="message"
        name="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => void handleClick()}>Ok</button>
    </div>
  );
};
