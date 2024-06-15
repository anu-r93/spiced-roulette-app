import jwt, { decode } from "jsonwebtoken";

export const generateAccessToken = async (payload) => {
  return jwt.sign(payload, process.env.SECRET_STRING);
};

export const verifyAccessToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
    console.log(decodedToken);
  } catch (error) {
    throw error;
  }
};
