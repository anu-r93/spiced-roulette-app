import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import ConnectionRequest from "@/db/models/ConnectionRequest";
import User from "@/db/models/User";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const loggedInUser = await decodeAccessToken(accessToken);

    const user = await User.findById(loggedInUser.id).populate("connections");

    return res.status(200).json({ connections: user.connections });
  } else {
    res.status(400);
  }
}
