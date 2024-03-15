import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Post from "../models/post.model.js";
import CustomError from "../utils/CustomError.js";
import ApiFeatures from "../utils/ApiFeatures.js";
const getPosts = asyncErrorHandler(async function (req, res, next) {
  const features = new ApiFeatures(Post.find({ isPrivate: false }), req.query)
    .limitFields()
    .paginate();
  const posts = await features.query;

  if (!posts) {
    return next(new CustomError(`Can not get posts`, 500));
  }

  if (posts.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more posts",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message:
      posts.length > 0
        ? `Successfully retrieved ${posts.length} posts`
        : "We do not have any public posts",
    data: { length: posts.length, posts },
  });
});

const getMyPosts = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  const features = new ApiFeatures(Post.find({ author: user.id }), req.query)
    .limitFields()
    .paginate();

  const posts = await features.query;

  if (!posts) {
    return next(new CustomError(`Can not get posts`, 500));
  }

  if (posts.length == 0 && +req.query.page > 1) {
    return res.status(404).json({
      status: "fail",
      message: "No more posts",
      data: {},
    });
  }

  res.status(200).json({
    status: "success",
    message:
      posts.length > 0
        ? `Successfully retrieved ${posts.length} posts`
        : "You do not have any posts",
    data: { _id: user.id, length: posts.length, posts },
  });
});

const getPost = asyncErrorHandler(async function (req, res, next) {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  if (!post) {
    return next(new CustomError(`Can not find post with id: ${postId}`, 404));
  }

  if (post.isPrivate) {
    return next(new CustomError("Post is private", 403));
  }

  res.status(200).json({
    status: "success",
    message: "Post retrieved successfully",
    data: { post },
  });
});

const postPost = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  const { title, content, thumbnail, category, keywords, slug, isPrivate } =
    req.body;

  const post = await Post.create({
    title,
    content,
    author: user.id,
    thumbnail,
    category,
    keywords,
    slug,
    isPrivate,
  });
  res.status(200).json({
    staus: "success",
    message: "Post created successfully",
    data: { post },
  });
});

const updatePost = asyncErrorHandler(async function (req, res, next) {
  const post = req.post;

  const { title, content, thumbnail, category, keywords, slug, isPrivate } =
    req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (thumbnail) post.thumbnail = thumbnail;
  if (category) post.category = category;
  if (keywords) post.keywords = keywords;
  if (slug) post.slug = slug;
  if (isPrivate) post.isPrivate = isPrivate;

  await post.save();

  res.status(200).json({
    status: "success",
    message: "Post Updated successfully",
    data: { post },
  });
});

const deletePost = asyncErrorHandler(async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Not implemented yet!" });
});

const getCategories = asyncErrorHandler(async function (req, res, next) {
  const categories = await Post.distinct("category");
  res.status(200).json({
    status: "success",
    data: { length: categories.length, categories },
  });
});

const getKeywords = asyncErrorHandler(async function (req, res, next) {
  const keywordsDoc = await Post.aggregate([
    { $unwind: "$keywords" },
    { $group: { _id: "$keywords" } },
  ]);

  // Extract only keyword strings from the aggregation result
  const keywords = keywordsDoc.map((kw) => kw._id);

  res
    .status(200)
    .json({ status: "success", data: { length: keywords.length, keywords } });
});

const getPostBySlug = asyncErrorHandler(async function (req, res, next) {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    return next(
      new CustomError(`Can not find post with slug: ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved successfully",
    data: { post },
  });
});

const postReactionOnPost = asyncErrorHandler(async function (req, res, next) {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new Error(`Can not find post with id: ${req.params.postId}`));
  }

  let index = post.reactions.findIndex((r) => r.userId == req.user.id);

  if (index !== -1) {
    // User has already reacted
    if (req.body.reaction.trim() === "") {
      // If new reaction is an empty string, remove the reaction
      post.reactions.splice(index, 1);
    } else {
      // Otherwise, update the reaction
      post.reactions[index].reaction = req.body.reaction;
    }
  } else if (req.body.reaction.trim() !== "") {
    // User has not reacted and the reaction is not an empty string, so add the reaction
    const reaction = {
      userId: req.user.id,
      reaction: req.body.reaction,
    };
    post.reactions.push(reaction);
  }

  // Save the post
  await post.save();

  res.status(200).json({
    status: "success",
    message: "Successfully reacted on post",
    data: { post },
  });
});

export {
  getPost,
  getMyPosts,
  postPost,
  updatePost,
  deletePost,
  getCategories,
  getKeywords,
  getPostBySlug,
  postReactionOnPost,
  getPosts,
};
