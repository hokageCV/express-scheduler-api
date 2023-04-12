import { google } from "googleapis";
import { oAuth2Client } from "./googleAuth";
import { v4 as uuid } from "uuid";

export const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client,
});

export async function createGCalEvent(
  startTime: Date,
  endTime: Date,
  hostEmail: string,
  nonHostEmail: string
) {
  try {
    const event = {
      summary: `meet with ${hostEmail}`,
      description: "jaruri meet hai yeh bohot",
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [{ email: hostEmail }, { email: nonHostEmail }],
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: event,
    });

    console.log("event created");
  } catch (err) {
    console.log("error in creating gcal event: ", err);
  }
}
