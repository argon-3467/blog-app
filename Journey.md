# Journey

## Todos API

- [x] Decide API response [structure](#api-response-structure)
- [x] Create CustomError [class](./api/utils/CustomError.js)
- [x] Create asyncErrorHandler [function](./api/utils/asyncErrorHandler.js)
- [ ] Plan User, Post, Comment [Schemas](./api/models/README.md)
- [ ] Plan auth, users, posts, comments, admin [routes](./api/routes/README.md)

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