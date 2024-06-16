import dbConnect from "@/db/connect";
import ConnectionRequest from "@/db/models/ConnectionRequest";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await dbConnect();

    const { id } = req.query;

    await ConnectionRequest.findByIdAndUpdate(id, {
      status: req.body.status,
    });

    return res
      .status(200)
      .json({ status: "success", message: "Connection request updated!" });
  } else {
    res.status(400);
  }
}
