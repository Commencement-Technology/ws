import { PoolClient } from 'pg';
import * as MessagesRepository from './messages.repository';

export interface Message {
  readonly id: string;
  readonly content: string;
  readonly created: string;
  readonly userId?: number;
}

export interface Context {
  readonly db: PoolClient;
}

export const createMessage = async (body: Message, ctx: Context): Promise<boolean> =>
  await MessagesRepository.insertMessage(body, ctx);

export const getMessages = async (ctx: Context, fromTimestamp?: string): Promise<Message[]> =>
  await MessagesRepository.allMessages(ctx, fromTimestamp);
