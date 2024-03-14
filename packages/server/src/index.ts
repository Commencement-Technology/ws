import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';
import { Message, createMessage, getMessages } from './messages/messages.controller';
import { Pool } from 'pg';

const app = express();
const db = new Pool();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());

app.get('/', (_: Request, res: Response): Response => {
  return res.send('Hello, World!');
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/messages', async (_: Request, res: Response) => {
  const dbPool = await db.connect();
  const messages = await getMessages({ db: dbPool });
  res.send(messages);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/message/new', async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { message } = req.body;
  const dbPool = await db.connect();
  const messageCreated = await createMessage(
    { id: uuid(), content: message as string },
    { db: dbPool },
  );
  messageCreated ? res.send('success') : res.send('failed');
});

const start = (): void => {
  try {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });

    wss.on('connection', function connection(ws) {
      ws.on('error', console.error);

      ws.send('something');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
