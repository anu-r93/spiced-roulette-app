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

    const loggedInUserConnections = await User.findById(loggedInUser.id);

    const users = await User.find({
      _id: { $nin: [loggedInUser.id, ...loggedInUserConnections.connections] },
    });

    const ignoreIdSet = new Set();
    const ignoreUser = (
      await ConnectionRequest.find({
        $or: [
          {
            receiver: loggedInUser.id,
          },
          {
            sender: loggedInUser.id,
          },
        ],
        status: { $in: ["pending", "connected"] },
      })
    ).map((user) => {
      ignoreIdSet.add(user.sender.toString());
      ignoreIdSet.add(user.receiver.toString());
    });

    const usersNotConnectedOrRequested = users.filter(
      (user) => !ignoreIdSet.has(user._id.toString())
    );

    const randomUser =
      usersNotConnectedOrRequested[
        Math.floor(Math.random() * usersNotConnectedOrRequested.length)
      ];

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
