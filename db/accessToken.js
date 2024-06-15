import jwt from "jsonwebtoken";

export const generateAccessToken = async (payload) => {
  console.log("env variable:", process.env);
  const token = jwt.sign(payload, process.env.SECRET_STRING);
  return token;
};

export const verifyAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_STRING);
    return decoded;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
