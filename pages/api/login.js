import { generateAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { comparePassword } from "@/db/passwordHelper";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const cookies = new Cookies(req, res);

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!comparePassword(password, user.password)) {
      return res.status(401).json({ status: "Invalid username or password." });
    }

    const accessToken = await generateAccessToken({
      name: user.fullName,
      id: user._id,
    });

    cookies.set("accessToken", accessToken, { httpOnly: true });

    return res
      .status(200)
      .json({ sucess: true, status: "You are logged in successfully!" });
  } else {
    res.status(404);
  }
}
