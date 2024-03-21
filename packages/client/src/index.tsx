import 'core-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import WebSocket from 'isomorphic-ws';
import { Form } from './form';
import { MessageList } from './message-list';

export const ws = new WebSocket('ws://localhost:8080/');

ws.onopen = function open() {
  console.log('ws connected');
};

ws.onclose = function close() {
  console.log('ws disconnected');
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <div>
      <h1>WebSockets</h1>
      <Form />
      <MessageList />
    </div>
  </StrictMode>,
);
