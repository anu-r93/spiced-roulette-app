import { generateAccessToken } from "@/db/accessToken";
import dbConnect from "@/db/connect";
import User from "@/db/models/users/User";
import { generatePassword } from "@/db/passwordHelper";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const cookies = new Cookies(req, res);

    const { fullName, email, password } = req.body;
    const user = new User({
      fullName,
      email,
      password: generatePassword(password),
    });
    await user.save();
    const accessToken = await generateAccessToken({
      name: user.fullName,
      id: user._id,
    });

    cookies.set("accessToken", accessToken, { httpOnly: true });

    return res
      .status(201)
      .json({ sucess: true, status: "You created a new user" });
  } else {
    res.status(404);
  }
}
