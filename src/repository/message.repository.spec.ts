import { getAllMessages } from "./message.repository";

describe("test message.repository", () => {
  it("get messages", async () => {
    const data = await getAllMessages();
    expect(data).toHaveLength(2);
  });
});
