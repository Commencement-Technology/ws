import { sql } from 'slonik';
import { Context, Message } from './messages.controller';

export const insertMessage = async (message: Message, context: Context): Promise<boolean> => {
  try {
    console.log('INSERT MESSAGE: ', message);
    const createMessage = sql.fragment`
        INSERT INTO messages (id, content)
        VALUES (${message.id}, ${message.content});
      `;

    await context.db.query(createMessage.sql, [...createMessage.values]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const allMessages = async (context: Context): Promise<Message[]> => {
  try {
    const all = await context.db.query(`SELECT * FROM messages`);
    return all.rows as Message[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
