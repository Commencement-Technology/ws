import { Pool } from 'pg';
import * as MessagesRepository from './messages.repository';

export interface Message {
  readonly id: string;
  readonly content: string;
  readonly created: string;
  readonly userId: string;
}

export interface Context {
  readonly db: Pool;
}

export const createMessage = async (body: Message, ctx: Context): Promise<boolean> =>
  await MessagesRepository.insertMessage(body, ctx);

export const getMessages = async (ctx: Context): Promise<Message[]> =>
  await MessagesRepository.allMessages(ctx);
