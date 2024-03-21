import { sql } from 'slonik';
import { Context, Message } from './messages.controller';

export const insertMessage = async (message: Message, context: Context): Promise<boolean> => {
  try {
    const createMessage = sql.fragment`
        INSERT INTO messages (id, content, created)
        VALUES (${message.id}, ${message.content}, ${message.created});
      `;

    await context.db.query(createMessage.sql, [...createMessage.values]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const allMessages = async (context: Context, fromTimestamp?: string): Promise<Message[]> => {
  try {
    const query = fromTimestamp
      ? `SELECT * FROM messages WHERE created > '${new Date(Number(fromTimestamp) * 1000).toISOString()}'`
      : `SELECT * FROM messages`;

    console.log('QUERY USING: ', query);
    const messages = await context.db.query(query);
    return messages.rows as Message[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
