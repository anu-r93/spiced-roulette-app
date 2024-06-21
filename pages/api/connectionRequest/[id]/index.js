import dbConnect from "@/db/connect";
import ConnectionRequest from "@/db/models/ConnectionRequest";
import User from "@/db/models/User";

//on click yes/no in pending request
export default async function handler(req, res) {
  if (req.method === "PUT") {
    await dbConnect();

    const { id } = req.query;
    const { status, sender, receiver } = req.body;

    await ConnectionRequest.findByIdAndUpdate(id, {
      status: status,
    });

    switch (status) {
      // Update connections array in Users collection for both sender and receiver
      case "connected":
        await User.findByIdAndUpdate(sender._id, {
          $push: { connections: receiver._id },
        });

        await User.findByIdAndUpdate(receiver._id, {
          $push: { connections: sender._id },
        });

        break;
      case "declined":
        break;
      default:
        break;
    }

    return res
      .status(200)
      .json({ status: "success", message: "Connection request updated!" });
  } else {
    res.status(400);
  }
}
