import jwt from "jsonwebtoken";

export const signEmailVerifyToken = (email) => {
  return jwt.sign({ email }, process.env.EMAIL_VERIFY_SECRET, {
    expiresIn: "24h",
  });
};

export const verifyEmailVerifyToken = (token) => {
  return jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);
};
