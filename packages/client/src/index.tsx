import 'core-js';
import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WebSocket from 'isomorphic-ws';
import { Form } from './form';
import { MessageList } from './message-list';
import { v4 as uuid } from 'uuid';
import { createGlobalStyle } from 'styled-components';

export const ws = new WebSocket('ws://localhost:8080/');

ws.onopen = () => console.log('WebSocket connected');
ws.onclose = () => console.log('WebSocket disconnected');

const userId = uuid();

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif 
  }
`;

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <GlobalStyles />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20em' }}>
      <h1>WebSockets</h1>
      <Form userId={userId} />
      <MessageList userId={userId} />
    </div>
  </StrictMode>,
);
