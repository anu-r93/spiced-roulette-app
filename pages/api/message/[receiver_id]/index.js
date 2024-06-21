import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import Message from "@/db/models/Message";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const loggedInUser = await decodeAccessToken(accessToken);

    const { receiver_id } = req.query;

    const messages = await Message.find({
      $or: [
        {
          sender: loggedInUser.id,
          receiver: receiver_id,
        },
        {
          sender: receiver_id,
          receiver: loggedInUser.id,
        },
      ],
    });

    return res.status(201).json({ status: "success", messages: messages });
  } else {
    res.status(400);
  }
}
