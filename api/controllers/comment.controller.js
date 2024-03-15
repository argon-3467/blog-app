import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Comment from "../models/comment.model.js";
import ApiFeatures from "../utils/ApiFeatures.js";

const getComment = asyncErrorHandler(async function (req, res, next) {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(
      new CustomError(`Cannot find comment with id: ${commentId}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Comment retrieved successfully",
    data: { comment },
  });
});

const updateComment = asyncErrorHandler(async function (req, res, next) {
  const commentId = req.params.commentId;
  const { content } = req.body;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(
      new CustomError(`Cannot find comment with id: ${commentId}`, 404)
    );
  }

  if (content) comment.content = content;

  await comment.save();

  res.status(200).json({
    status: "success",
    message: "Comment updated successfully",
    data: { comment },
  });
});

const deleteComment = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getCommentsOnPost = asyncErrorHandler(async function (req, res, next) {
  const postId = req.params.postId;
  const features = new ApiFeatures(
    Comment.find({ entityId: postId, commentEntityModel: "Post" }),
    req.query
  )
    .limitFields()
    .paginate();

  const comments = await features.query;

  if (!comments) {
    return next(
      new CustomError(`Can not find comments of post with id: ${postId}`, 404)
    );
  }

  if (comments.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more comments",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message:
      comments.length > 0
        ? `Successfully retrieved ${comments.length} comments of post with id: ${postId}`
        : "Post does not have any comments",
    data: { _id: postId, length: comments.length, comments },
  });
});

const postCommentOnPost = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  const commentEntityModel = "Post";
  const entityId = req.params.postId;
  const { content } = req.body;
  const comment = await Comment.create({
    content,
    author: user.id,
    commentEntityModel,
    entityId,
  });
  res.status(200).json({
    status: "success",
    message: "comment created successfully",
    data: {
      comment,
    },
  });
});

const getCommentsOnComment = asyncErrorHandler(async function (req, res, next) {
  const entityId = req.params.commentId;
  const features = new ApiFeatures(
    Comment.find({ entityId, commentEntityModel: "Comment" }),
    req.query
  )
    .limitFields()
    .paginate();

  const replies = await features.query;

  if (!replies) {
    return next(
      new CustomError(`Can not find replies of comment with id: ${postId}`, 404)
    );
  }

  if (replies.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more replies",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message:
      replies.length > 0
        ? `Successfully retrieved ${replies.length} comments of post with id: ${entityId}`
        : "comment does not have any replies",
    data: { _id: entityId, length: replies.length, replies },
  });
});

const postCommentOnComment = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  const commentEntityModel = "Comment";
  const entityId = req.params.commentId;
  const { content } = req.body;
  const comment = await Comment.create({
    content,
    author: user.id,
    commentEntityModel,
    entityId,
  });
  res.status(200).json({
    status: "success",
    message: "comment created successfully",
    data: {
      comment,
    },
  });
});
const postReactionOnComment = asyncErrorHandler(async function (
  req,
  res,
  next
) {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    return next(
      new Error(`Can not find comment with id: ${req.params.commentId}`)
    );
  }

  let index = comment.reactions.findIndex((r) => r.userId == req.user.id);

  if (index !== -1) {
    // User has already reacted
    if (req.body.reaction.trim() === "") {
      // If new reaction is an empty string, remove the reaction
      comment.reactions.splice(index, 1);
    } else {
      // Otherwise, update the reaction
      comment.reactions[index].reaction = req.body.reaction;
    }
  } else if (req.body.reaction.trim() !== "") {
    // User has not reacted and the reaction is not an empty string, so add the reaction
    const reaction = {
      userId: req.user.id,
      reaction: req.body.reaction,
    };
    comment.reactions.push(reaction);
  }

  await comment.save();

  res.status(200).json({
    status: "success",
    message: "Successfully reacted on comment",
    data: { comment },
  });
});

export {
  getComment,
  updateComment,
  deleteComment,
  getCommentsOnPost,
  postCommentOnPost,
  getCommentsOnComment,
  postCommentOnComment,
  postReactionOnComment,
};
