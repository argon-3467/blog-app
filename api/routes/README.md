# Routes

This directory contains the routes for the blog application. Each route corresponds to a specific endpoint and HTTP method. The routes are versioned and all start with `/api/v1`.

## Auth Routes

- `POST /api/v1/auth/signup`: SignUp a new user.
- `POST /api/v1/auth/signin`: SiginIn an existing user and return a JWT.

## User Routes

- `GET /api/v1/users/me`: Get the currently logged in user's information (verifyMember).
- `PUT /api/v1/users/me`: Update the currently logged in user's information (verifyMember).
- `DELETE /api/v1/users/me`: Delete the currently logged in user's account (verifyMember).
- `GET /api/v1/users/:userId`: Publicly available information of a user.
- `GET /api/v1/users/`: List of All users (pagination + filtering features) (verifyMember).
- `GET /api/v1/users/:userId/posts`: Get all the posts of user (verifyMember).
- `GET /api/v1/users/:userId/comments`: Get all the comments of user (verifyMember).

## Post Routes

- `GET /api/v1/posts`: Get all public posts.
- `GET /api/v1/posts/:postId`: Get a specific post by ID.
- `GET /api/v1/posts/categories/`: Get all categories.
- `GET /api/v1/posts/keywords/`: Get all keywords
- `GET /api/v1/posts/slug/:slug`: Get a specific post by its slug.
- `POST /api/v1/posts`: Create a new post (verifyMember).
- `PUT /api/v1/posts/:postId`: Update a specific post by ID (verifySelf).
- `DELETE /api/v1/posts/:postId`: Delete a specific post by ID (verifySelf).
- `POST /api/v1/posts/:postId/likes`: Like a specific post (verifyMember).
- `POST /api/v1/posts/:postId/dislikes`: DisLike a specific post (verifyMember).
- `GET /api/v1/posts/:postId/comments`: Get all comments for a specific post.
- `POST /api/v1/posts/:postId/comments`: Create a new comment for a specific post (verifyMember).

## Comment Routes

- `GET /api/v1/comments/:commentId`: Get a specific comment by Id.
- `PUT /api/v1/comments/:commentId`: Update a specific comment by ID (verifySelf).
- `DELETE /api/v1/comments/:commentId`: Delete a specific comment by ID (verifySelf).
- `GET /api/v1/comments/:commentId/replies`: Get all comments on the comment
- `POST /api/v1/comments/:commentId/replies`: Post Comment on Comment (verifyMember).
- `POST /api/v1/comments/:commentId/likes`: Like a specific comment (verifyMember).
- `POST /api/v1/comments/:commentId/dislikes`: Dislike a specific comment (verifyMember).

## Admin Routes (verifyAdmin)

- `DELETE /api/v1/admin/users/:userId`: Delete a specific user by ID.
- `DELETE /api/v1/admin/posts/:postId`: Delete a specific post by ID.
- `DELETE /api/v1/admin/comments/:commentId`: Delete a specific comment by ID.
- `POST /api/v1/admin/users/:userId/role`: Update role of a specific user by ID.
