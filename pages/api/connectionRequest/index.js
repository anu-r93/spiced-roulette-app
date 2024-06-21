import { decodeAccessToken } from "@/db/accessToken";
import User from "@/db/models/ConnectionRequest";
import ConnectionRequest from "@/db/models/ConnectionRequest";
import dbConnect from "@/db/connect";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const loggedInUser = await decodeAccessToken(accessToken);

    const { receiverId } = req.body;

    await ConnectionRequest.create({
      sender: loggedInUser.id,
      receiver: receiverId,
      status: "pending",
    });

    return res.status(200).json({
      status: "success",
      message: "Connection request sent successfully!",
    });
  } else if (req.method === "GET") {
    await dbConnect();

    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const loggedInUser = await decodeAccessToken(accessToken);

    const connectionRequests = await ConnectionRequest.find({
      receiver: loggedInUser.id,
      status: "pending",
    }).populate(["sender", "receiver"]);

    return res.status(200).json({ connectionRequests });
  } else {
    res.status(400);
  }
}
