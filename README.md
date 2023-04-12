# Scheduler API

An api to schedule google meets with each other.

### Features

- Create slots in which other's can schedule meetings
- Schedule meetings with other's
- Get a list of all your meetings
- Automatically add google meet event to google calendar

### API Documentation

Documetation is created using Swagger. It can be referred [here](https://express-scheduler-api-production.up.railway.app/docs).

### My Learnings

- Zod
  - Earlier I have used express-validator. This is the first time I am using Zod. It has lot of tiny inbuild validators which I used to write by myself in express-validator
  - I liked its way of presenting the errors in a structured manner. And it also generates error messages itself
- Swagger
  - Swagger is good for large projects but personally I didn't liked it much due to its highly verbose syntax
- Docker
  - This was a bit challenging part
  -
- Google Calendar Integration
  - This was the most challenging part as well as the part where I learnt the most
  - Most of the time for the project creation went in this
  - Learnt a lot about OAuth and how it works

### My Journey

First I set up the basic structure like the handlers, routes, models & database.

Then I created schema in zod for validation for the input. I liked its simplicity and the way it presents the errors. All the functions out of the box are very useful.

After than I created the documentation using swagger. It is good in projects where several people are working since it provides a structure the documentation. But personally I didn't liked it much due to its highly verbose syntax.

Then comes the calendar integration part, which was the most challenging. I had to learn a lot about OAuth and how it works. [This](https://youtu.be/hHRFjbGTEOk) video explains it very well.
Main problem that I was facing was to get the token from browser to server, this cosumed a lot of time.
Later I found about OAuth from postman itself.

Then using the calendar API, I function that was creating events in the calendar into the handler that booked the slot. When the first event was created in the calendar, it felt like a huge achievement. Later I added the google meet link to the event.

After that I created the docker file and created an image of the project.

At last, I deployed the project on Railway.
