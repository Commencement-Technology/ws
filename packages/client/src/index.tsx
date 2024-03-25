import 'core-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import WebSocket from 'isomorphic-ws';
import { Form } from './form';
import { MessageList } from './message-list';
import { v4 as uuid } from 'uuid';

export const ws = new WebSocket('ws://localhost:8080/');

ws.onopen = function open() {
  console.log('ws connected');
};

ws.onclose = function close() {
  console.log('ws disconnected');
};

const userId = uuid();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20em' }}>
      <h1>WebSockets</h1>
      <Form userId={userId} />
      <MessageList userId={userId} />
    </div>
  </StrictMode>,
);
