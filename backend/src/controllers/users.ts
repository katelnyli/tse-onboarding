import UserModel from "src/models/user";

import type { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().sort("name");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
