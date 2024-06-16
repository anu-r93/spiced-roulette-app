import { decodeAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cookies = new Cookies(req, res);

    const accessToken = cookies.get("accessToken");

    const loggedInUser = await decodeAccessToken(accessToken);

    await dbConnect();

    const user = await User.findById(loggedInUser.id);

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
      },
    });
  } else {
    res.status(400);
  }
}
