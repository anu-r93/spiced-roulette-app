import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import ConnectionRequest from "@/db/models/ConnectionRequest";
import User from "@/db/models/User";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cookies = new Cookies(req, res);

    const accessToken = cookies.get("accessToken");

    const loggedInUser = await decodeAccessToken(accessToken);

    await dbConnect();

    const users = await User.find({
      _id: { $nin: loggedInUser.id },
    });

    const ignoreUserIds = (
      await ConnectionRequest.find({
        sender: loggedInUser.id,
        status: { $in: ["pending", "connected"] },
      }).distinct("receiver")
    ).map((id) => id.toString());

    const excludeUserAlreadySentRequest = users.filter(
      (user) => !ignoreUserIds.includes(user._id.toString())
    );

    const randomUser =
      excludeUserAlreadySentRequest[Math.floor(Math.random() * users.length)];

    return res.status(200).json({
      user: {
        id: randomUser._id,
        name: randomUser.fullName,
        email: randomUser.email,
        avatar: randomUser.avatar,
        bio: randomUser.bio,
      },
    });
  } else {
    res.status(400);
  }
}
