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

- [ ] Set up a database for storing availability of the host
  - [ ] Choose a database (e.g., MongoDB, PostgreSQL)
  - [ ] Create a schema for the host's availability
- [ ] Create APIs for the following functionalities:
  - [ ] Register a host
    - [ ] Validate the input using Zod
    - [ ] Hash the password using bcrypt
    - [ ] Store the host's information in the database
  - [ ] Log in a host
    - [ ] Validate the input using Zod
    - [ ] Verify the password using bcrypt
    - [ ] Generate a JWT token using jsonwebtoken
  - [ ] Fetch the availability of a host
    - [ ] Validate the input using Zod
    - [ ] Retrieve the host's availability from the database
  - [ ] Schedule a meeting with a host
    - [ ] Validate the input using Zod
    - [ ] Check if the requested time slot is available
    - [ ] Add the meeting to the host's and user's Google Calendar
    - [ ] Store the meeting information in the database
  - [ ] Fetch the scheduled meetings of a host
    - [ ] Validate the input using Zod
    - [ ] Retrieve the host's scheduled meetings from the database
  - [ ] Fetch the scheduled meetings of a non-host user
    - [ ] Validate the input using Zod
    - [ ] Retrieve the user's scheduled meetings from the database
- [ ] Document the APIs using Swagger
