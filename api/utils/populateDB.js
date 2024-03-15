#! /usr/bin/env node

// Make sure you have the MONOG_URI variable in the .env file or have the mongodb service running on "mongodb://localhost:27017/"
// You need to disable the uniqueValidator plugin at line no. 54 in user.model.js and at line no. 60 in post.model.js
// The reason for this is because this plugin checks uniqueness asynchronously and that means you can't save the document before it has checked the uniqueness.

// Run the script with `node --env-file=.env api/utils/populateDB.js`

// After you have populated your database plz don't forget uncomment the plugin.

import { faker } from "@faker-js/faker";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

let categories = [
  "Technology",
  "Health & Wellness",
  "Travel",
  "Food & Recipes",
  "Education",
  "Fashion",
  "Sports",
  "Entertainment",
  "Business & Finance",
  "Arts & Crafts",
];

let keywords = [
  "Artificial Intelligence",
  "Yoga",
  "Europe Travel",
  "Vegan Recipes",
  "Online Learning",
  "Summer Fashion",
  "Football",
  "Movie Reviews",
  "Stock Market",
  "Watercolor Painting",
  "Digital Marketing",
  "Mental Health",
  "Adventure Travel",
  "Gluten-free Baking",
  "E-Learning Platforms",
  "Winter Wardrobe",
  "Basketball",
  "Book Recommendations",
  "Real Estate Investment",
  "DIY Home Decor",
];

const reactions = ["like", "dislike", "love", "haha", "wow", "sad", "angry"];

const users_len = 100;
let users = [];
const posts_len = 100;
let posts = [];
const comments_len = 200;
let comments = [];
const reactionsCapPost = 50;
const reactionsCapComment = 20;

import mongoose from "mongoose";
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/blog-app-dev"
  );
  console.log("Connected to DB");

  users = fakeDocuments(users_len, createUser);
  console.log("Created Users");

  posts = fakeDocuments(posts_len, createPost);
  console.log("Created Posts");

  fakeDocuments(comments_len, createComment);
  console.log("Created Comments");

  console.log("Saving Users to DB");
  await saveFakeDocuments(users);
  console.log("Saved Users to DB");

  console.log("Saving Posts to DB");
  await saveFakeDocuments(posts);
  console.log("Saved Posts to DB");

  console.log("Saving Comments to DB");
  await saveFakeDocuments(comments);
  console.log("Saved Comments to DB");

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

/**
 * Generates an array of fake documents.
 *
 * @param {number} len - The length of the returned array.
 * @param {function} fn - A function that returns a Mongoose Document.
 * @returns {Array} An array of length `len`, filled with documents returned by the `fn` function.
 */
function fakeDocuments(len, fn) {
  return Array.from({ length: len }, fn);
}

/**
 * Asynchronously saves an array of documents to the database in parallel.
 *
 * @param {Array} arr - The array of documents to be saved.
 * @returns {Promise} A promise that resolves when all documents have been saved in parallel.
 */
async function saveFakeDocuments(arr) {
  await Promise.all(arr.map((val) => val.save()));
}

/**
 * Generates a fake User Model document.
 *
 * @param {any} _ - The current element being processed in the array. This argument is not used in the function
 * @param {number} i - The index of the current element being processed in the array.
 * @returns {Object} A fake User Model document.
 */
function createUser(_, i) {
  const user = new User({
    username: faker.internet.userName() + "_" + i,
    email: "user_" + i + "@blog.app",
    password: "12345678",
    profilePicture: faker.image.url(),
    role: "member",
  });

  return user;
}

/**
 * Generates a fake Post Model document.
 *
 * @param {any} _ - The current element being processed in the array. This argument is not used in the function
 * @param {number} i - The index of the current element being processed in the array.
 * @returns {Object} A fake Post Model document.
 */
function createPost(_, i) {
  const author = randomFromArray(users);
  const keywordsIndices = Array.from(randomIndices(3, keywords.length));
  const reactionIndices = Array.from(
    randomIndices(reactionsCapPost, users.length)
  );
  const post = new Post({
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
    author,
    thumbnail: faker.image.url(),
    category: randomFromArray(categories),
    keywords: keywordsIndices.map((i) => keywords[i]),
    slug: "slug-number-" + i,
    isPrivate: Math.random() < 0.1,
    reactions: reactionIndices.map((i) => createReaction(i)),
  });
  return post;
}
/**
 * Generates a fake Comment Model document (comment on post)
 *
 * @param {any} _ - The current element being processed in the array. This argument is not used in the function
 * @param {number} i - The index of the current element being processed in the array.
 * @returns {Object} A fake Comment Model document.
 */
function createComment(_, i) {
  const author = randomFromArray(users);
  const commentEntityModel = Math.random() < 0.6 ? "Post" : "Comment";
  const entityId =
    commentEntityModel == "Post"
      ? randomFromArray(posts)
      : randomFromArray(comments);
  const post = randomFromArray(posts);
  const reactionIndices = Array.from(
    randomIndices(reactionsCapComment, users.length)
  );
  const comment = new Comment({
    content: faker.lorem.sentences(),
    author,
    commentEntityModel,
    entityId,
    reactions: reactionIndices.map((i) => createReaction(i)),
  });
  comments.push(comment);
  return comment;
}

/* Helper functions */

/**
 * Returns a random value from the given array.
 *
 * @param {Array} arr The array from which to select a random value.
 * @returns {any} A random value from the given array.
 */
function randomFromArray(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * Returns an Set of max size len with unique indices upto size
 *
 * @param {number} len Size of the returned Set will be in range [0 - len]
 * @param {number} size Indices generated will be in range [0 - size)
 * @returns {set} An set of unique indicies
 */
function randomIndices(len, size) {
  const set = new Set();

  for (let i = 0; i < len; ++i) {
    const index = Math.floor(Math.random() * size);
    set.add(index);
  }

  return set;
}

function createReaction(i) {
  const userId = users[i];
  const reaction = randomFromArray(reactions);
  return {
    userId,
    reaction,
  };
}
