# Journey

## Todos API

- [x] Decide API response [structure](#api-response-structure)
- [x] Create CustomError [class](./api/utils/CustomError.js)
- [x] Create asyncErrorHandler [function](./api/utils/asyncErrorHandler.js)
- [x] Plan User, Post, Comment [Schemas](./api/models/README.md)
- [x] Plan auth, users, posts, comments, admin [routes](./api/routes/README.md)
- [x] Create [User Model](./api/models/user.model.js)
- [x] Create [Post Model](./api/models/post.model.js)
- [x] Create [Comment Model](./api/models/comment.model.js)
- [ ] Implement Initial Global Error handling contoller
- [ ] Create Auth routes and controller
- [ ] Create User routes and controller
- [ ] Create a API features class with features like: filter, sort, limit, paginate
- [ ] Create Post routes and controller
- [ ] Create Comment routes and controller
- [ ] Create Admin routes and controller

## Todos Client

### API response structure

- Contains a status property to denote the wether the operation was "success", "fail" (for client side errors) or "error" (for server side errors)
- Contains a message property for the short description of what happend.
- Contains a data property which contains relevent data or erros regarding the requested resource.

```
status: "success" or "fail" or "error",
message: "A message for the client",
data: {} // Relevent Data goes inside this.
```
