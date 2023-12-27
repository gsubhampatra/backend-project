import { ApiErorr } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const varifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiErorr(400, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE);

  const user = await User.findById(decodedToken?._id).select(
    "-passsword -refreshToken"
  );
  if (!user) {
    throw new ApiErorr(401, "Invalid Access Token");
  }
  req.user = user;
  next();
});
