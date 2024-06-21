import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import Message from "@/db/models/Message";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const loggedInUser = await decodeAccessToken(accessToken);

    const { receiver, message } = req.body;

    const messageInfo = new Message({
      sender: loggedInUser.id,
      receiver,
      message,
      timestamp: new Date(),
    });

    await messageInfo.save();

    return res
      .status(201)
      .json({ status: "success", message: "Message sent!" });
  } else {
    res.status(400);
  }
}
