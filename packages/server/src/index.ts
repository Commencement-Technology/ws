import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { getAllMessages } from './messages/messages.controller';
import { Pool } from 'pg';
import cors from 'cors';
import { Message, insertMessage } from './messages/messages.repository';

const app = express();
const db = new Pool();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/messages', async (_: Request, res: Response) => {
  const messages = await getAllMessages({ db });
  res.send(messages);
});

const start = (): void => {
  try {
    app.listen(4000, () => console.log('Server started on port 4000'));

    wss.on('connection', (ws) => {
      ws.on('error', console.error);

      ws.on('message', (msg, isBinary) => {
        const msgAsString = msg.toString('utf-8');
        const msgObject = JSON.parse(msgAsString) as Message;
        insertMessage(msgObject, { db }).catch((e) => console.error(e));

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msgAsString, { binary: isBinary });
          }
        });
      });
    });

    wss.on('close', () => console.log('Connection closed'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
