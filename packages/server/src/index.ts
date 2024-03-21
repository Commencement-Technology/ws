import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuid } from 'uuid';
import { createMessage, getMessages } from './messages/messages.controller';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const db = new Pool();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/messages', async (_: Request, res: Response) => {
  const dbPool = await db.connect();
  const messages = await getMessages({ db: dbPool });
  res.send(messages);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/message/new', async (req: Request, res: Response) => {
  const { message } = req.body as { message: string };
  const dbPool = await db.connect();
  const messageCreated = await createMessage({ id: uuid(), content: message }, { db: dbPool });
  messageCreated ? res.send('success') : res.send('failed');
});

const start = (): void => {
  try {
    app.listen(4000, () => {
      console.log('Server started on port 4000');
    });

    wss.on('connection', function connection(ws) {
      ws.on('error', console.error);

      ws.on('message', function message(data) {
        console.log('received: ', data);

        if (String(data) === 'new') {
          console.log('SENDING REFETCH BACK...');
          wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send('refetch');
            }
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
