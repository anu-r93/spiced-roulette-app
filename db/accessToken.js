import jwt from "jsonwebtoken";

export const generateAccessToken = async (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_STRING);
  return token;
};

export const decodeAccessToken = async (token) => {
  return jwt.decode(token);
};

// this isn't fully functional, to look at it later
export const verifyAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_STRING);
    return decoded;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
