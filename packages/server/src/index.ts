import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { Message, createMessage, getMessages } from './messages/messages.controller';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const db = new Pool();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/messages', async (_: Request, res: Response) => {
  const messages = await getMessages({ db });
  res.send(messages);
});

const start = (): void => {
  try {
    app.listen(4000, () => {
      console.log('Server started on port 4000');
    });

    wss.on('connection', (ws) => {
      ws.on('error', console.error);

      ws.on('message', (msg, isBinary) => {
        const msgAsString = msg.toString('utf-8');
        const msgObject = JSON.parse(msgAsString) as Message;
        createMessage(msgObject, { db }).catch((e) => console.error(e));

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msgAsString, { binary: isBinary });
          }
        });
      });
    });

    wss.on('close', () => {
      console.log('Connect closed');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
