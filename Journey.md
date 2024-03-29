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
- [x] Implement Initial Global Error handling [contoller](./api/controllers/error.controller.js)
- [x] Create Auth [routes](./api/routes/auth.router.js) and [controller](./api/controllers/auth.controller.js)
- [x] Create a json file to import routes in Postman as a collection
- [x] Write a script to populate database with dummy data
- [x] Create Fake routes and controller files
- [x] Remove double referncing from schemas (Much faster creation and updates)
- [x] Add reactions to comments and posts schemas
- [x] Update the [populateDB.js](./api/utils/populateDB.js) script because of schema change
- [x] Update the auth [controller](./api/controllers/auth.controller.js) due to schema changes
- [x] Create User routes and controller
- [x] Create a API features class with features like: limit, paginate
- [x] Create Post routes and controller
- [x] Create Comment routes and controller
- [ ] Decide and Implement the delete routes
- [ ] Create Admin routes and controller
- [ ] Add filter, sort methods to Api features

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
