import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";

const updateUserRole = asyncErrorHandler(async function (req, res, next) {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { role: req.body.role },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(
      new CustomError(
        `Can not find user with id: ${req.params.userId}`,
        404,
        "NotFound"
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: `Role for user with id: ${req.params.userId} changed ${user.role}`,
    data: { user },
  });
});
export { updateUserRole };
