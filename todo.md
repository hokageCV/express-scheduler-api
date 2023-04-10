## Backend-end Developer Assignment - FastJobs.io

### Framework/tool requirements

- [x] Install and set up Express.js with Typescript
- [ ] Install and set up Docker
  - [ ] Create a Dockerfile for the project
  - [ ] Use Docker Compose to set up the development environment
- [ ] Install and set up a validation library (Zod preferred)
- [ ] Install and set up an API Docs library (Swagger preferred)
- [ ] Implement OAuth for Google Calendar Integration

### Feature requirements

- [x] Set up a database for storing availability of the host
  - [x] Choose a database (e.g., MongoDB, PostgreSQL)
  - [x] Create a schema for the host's availability
- [ ] Create APIs for the following functionalities:
  - [x] Register a host
    - [ ] Validate the input using Zod
    - [x] Hash the password using bcrypt
    - [x] Store the host's information in the database
  - [x] Log in a host
    - [ ] Validate the input using Zod
    - [x] Verify the password using bcrypt
    - [x] Generate a JWT token using jsonwebtoken
  - [x] Fetch the availability of a host
    - [ ] Validate the input using Zod
    - [x] Retrieve the host's availability from the database
  - [ ] Schedule a meeting with a host
    - [ ] Validate the input using Zod
    - [x] Check if the requested time slot is available
    - [ ] Add the meeting to the host's and user's Google Calendar
    - [x] Store the meeting information in the database
  - [ ] Fetch the scheduled meetings of a host
    - [ ] Validate the input using Zod
    - [x] Retrieve the host's scheduled meetings from the database
  - [ ] Fetch the scheduled meetings of a non-host user
    - [ ] Validate the input using Zod
    - [ ] Retrieve the user's scheduled meetings from the database
- [ ] Document the APIs using Swagger
