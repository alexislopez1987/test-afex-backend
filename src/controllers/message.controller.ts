import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllMessages } from "../repository/message.repository";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const data = await getAllMessages();
    res.status(StatusCodes.OK).json({ message: data });
  } catch (err) {
    console.error("error getting message", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messages: "error getting message" });
  }
};
