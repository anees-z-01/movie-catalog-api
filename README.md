# Movie Catalog API

An Express / TypeScript API backed by MongoDB. Authenticated users manage their own movie records, including a title, publication year, and uploaded image. Queries scope reads and writes to the current user.

## Local setup

Start MongoDB, copy `.env_sample` to `.env`, and configure its connection URI, server port, and a fresh `JWT_SECRET` of at least 32 characters. Consult `src/middlewares/auth.ts` for authentication requirements. Install with `npm install` and run `npm start`.

The client counterpart is [movie-browser-web](https://github.com/anees-z-01/movie-browser-web). Check `src/app.ts` for route mounting and `src/routes` for the endpoint contract.

| Route | Purpose |
| --- | --- |
| `POST /login` | Verify credentials and issue a session token |
| `POST /logout` | Invalidate the saved token |
| `GET /movies?page=1&pageSize=10` | List the current user's records |
| `GET /movies/:id` | Read a user-owned record |
| `POST /movies` | Upload a movie as multipart form data |
| `PUT /movies/:id` | Update metadata and optionally replace the image |

The upload fields are `title`, `publicationYear`, and `image`. Creation returns 201; invalid fields return 400. `src/routes/__tests__/movie.test.ts` contains route tests; use the manifest's test script.

## Boundaries

Images currently use in-memory uploads and are stored with the record. Before exposing the service, bound upload size and list page size, validate image content, and move large files to object storage. Authentication and a demo frontend are not evidence of production readiness. The checked-in environment example intentionally contains no usable secret.

The API caps pages at 100 records and individual uploads at 5 MiB. Image-content validation and object storage remain deployment work. The optional `npm run db:seed` requires a fresh `SEED_USER_PASSWORD` of at least 12 characters; it never supplies a built-in password.
