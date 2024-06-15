import dbConnect from "@/db/connect";
import User from "@/db/models/users/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    const user = await User.find();
    const randomUser = user[Math.floor(Math.random() * user.length)];

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
