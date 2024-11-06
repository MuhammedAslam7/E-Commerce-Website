import jwt from "jsonwebtoken";

//create refresh token
export const refreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN, {
    expiresIn: "id",
  });
};

//create access token
export const refreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "1m",
  });
};
