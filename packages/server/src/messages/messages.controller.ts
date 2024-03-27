import { Pool } from 'pg';
import { Message, getMessages } from './messages.repository';

export interface Context {
  readonly db: Pool;
}

export const getAllMessages = async (ctx: Context): Promise<Message[]> => await getMessages(ctx);
