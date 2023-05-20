import { Message } from "../models/message.model";

export const getAllMessages = async (): Promise<Message[]> => {
  const messages = await new Promise<Message[]>((resolve, reject) => {
    const messages: Message[] = [];
    messages.push({ id: 1, name: "name1", message: "message1" });
    messages.push({ id: 2, name: "name2", message: "message2" });

    resolve(messages);
  });

  return messages;
};
