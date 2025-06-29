# Bequest Interview Question

Play the video below, make sure to enable sound :)

https://github.com/user-attachments/assets/ca29c857-f995-4241-a709-a85ad87b07e3

## Setup

### Prerequisites

```
Postgres 14.x
Node
```

### Installation

Open the terminal in {path-to-project}/bequest-interview-v2

```
npm install
```

You will have to create a user in postgres to run the project locally;
On linux, it can be done by closely following these steps:

```sh
psql postgres
# now inside the postgres terminal acting as postgres user

CREATE ROLE gymsesh_local WITH LOGIN PASSWORD 'GymS&sh';
ALTER ROLE gymsesh_local SUPERUSER;

exit
```

### Running Backend

To run your backend, follow these steps:

1- Create a `.env` file inside the root folder and add the following content:

```
DATABASE_URL="postgresql://bequest_interview:B&qu&st@localhost:5432/bequest_interview?schema=public"
```

2- Run prisma migrations:

```sh
npx prisma migrate dev
```

3- Now, you can start the server:

```sh
npx nx serve backend
```

### Running Frontend

Just run this command:

```sh
npx nx serve frontend
```

And you're all set! Open http://localhost:4200 and play with the document editor.

## Assumptions and Conclusions

Although the video was clear, I had to make a few assumptions based on the task given

- I assumed I had to only autosave for the backend but nothing about versioning was mentioned – I prepared the db initally to support versioning but did not want to overcomplicate it so, right now, it just loads the document and, if there is an existing document, it overwrites with changed data, if not, it creates a new one
- I did not use `xmldom` for any document manipulation as I found SyncFusion's manipulation methods pretty advanced, but I did find a few difficulties along the way to handle Bookmarks, I am not 100% satisfied with it but, for the time spent, I believe it achieved the required goals
- I did not create any database for clauses, I simply added a couple from the video and generated others with AI and stored in a hardcoded variable. Every time you add a clause, it will simply find the next available one and insert. That said, I did not create the modal showed in the video to select clauses.
- I used SyncFusion's document schemas and extensions to create the predefined clauses, I do not think it is formatting correctly like I wanted but, while editing, looks okay
- Overall, it does what the requirements describe, but if this was to be deployed for a real-world scenario, I would:
  - Spend more time improving the clauses chunks handlers (and probably use `xmldom` like suggested)
  - Add versioning for users to be able to recover autosaved changes (and probably add a version menu somewhere)
  - Improve clauses database with a unified schema for them (Sfdt is weird and not very descriptive, i did not find many docs about it as well)
  - Of course, use react-query for better API communication and state and cache management
  - Add tests (!!!!)
- That's all :) thanks for taking the time to read this
