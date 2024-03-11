# Models

This directory contains the data models for the blog application. Each model represents a collection in the MongoDB database. Here are the models and their fields:

## User

- ### Properties
  - `username`: A unique identifier for the user. (required)
  - `email`: The user's unique email address.
  - `password`: The user's hashed password. (required)
  - `profilePicture`: The url for the user's profile picture otherwise a default
  - `posts`: An array of references to the posts created by the user.
  - `comments`: An array of references to the comments made by the user.
  - `role`: The user’s role, which can be ‘member’, ‘admin’, or ‘visitor’.
- ### Plugins
  - `uniqueValidator`: Checks unique fields and throws ValidationError if not unique
- ### Middlewares
  - `pre save`: Hash the password before saving to the database
- ### Methods
  - `verifyPassword`: Compares user's provided password with password in database.

## Post

- ### Properties
  - `title`: The title of the post.
  - `content`: The content of the post, formatted in Markdown.
  - `author`: A reference to the user who created the post.
  - `thumbnail`: The url for the post's thumbnail otherwise a default
  - `category`: This field represents the category or topic that the post belongs to defaults to 'uncategorized'
  - `keywords`: These are specific words or phrases that describe the contents of the post.
  - `slug`: This is a part of the URL for the post must be unique.
  - `private`: A boolean indicating whether the post is private.
  - `likes`: An array of user IDs representing likes.
  - `dislikes`: An array of user IDs representing dislikes.
  - `comments`: An array of references to the comments on the post.
  - ### Plugins
    - `uniqueValidator`: Checks unique fields and throws ValidationError if not unique

## Comment

- ### Properties
  - `content`: The content of the comment, formatted in Markdown.
  - `author`: A reference to the user who made the comment.
  - `commentEntityModel`: Either ‘Comment’ or ‘Post’, indicating whether the comment is on another comment or a post.
  - `entityId`: A reference to the entity the comment is on.
  - `replies`: An array of references to other comments that are replies to this comment.
  - `likes`: An array of user IDs representing likes.
  - `dislikes`: An array of user IDs representing dislikes.

Each Schema will also have the timestamp option as true for the createdAt and updatedAt fields.

# Todo

- [ ] `likedPosts`, `dislikedPosts`, `likedComments`, `dislikedComments` for each user.
