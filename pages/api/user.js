import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import User from "@/db/models/users/User";
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

    const randomUser = users[Math.floor(Math.random() * users.length)];

    return res.status(200).json({
      user: {
        name: randomUser.fullName,
        email: randomUser.email,
        avatar: randomUser.avatar,
      },
    });
  } else {
    res.status(400);
  }
}
