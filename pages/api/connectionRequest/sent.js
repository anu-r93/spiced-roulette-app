import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import ConnectionRequest from "@/db/models/ConnectionRequest";
import Cookies from "cookies";

//on click yes/no in pending request
export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const loggedInUser = await decodeAccessToken(accessToken);

    const connectionRequests = await ConnectionRequest.find({
      sender: loggedInUser.id,
      status: "pending",
    }).populate("receiver");

    return res.status(200).json({ connectionRequests });
  } else {
    res.status(400);
  }
}
