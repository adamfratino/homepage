/** Where the NAS lives; history timestamps are shown as local dates there. */
const HOME_TIME_ZONE = "America/New_York";

const homeDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: HOME_TIME_ZONE,
});

const homeDateTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
  timeZone: HOME_TIME_ZONE,
});

const calendarDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an instant as the calendar date it fell on at home. */
export function formatHomeDate(isoTimestamp: string): string {
  return homeDate.format(new Date(isoTimestamp));
}

/** Formats an instant as the date and clock time it was at home, e.g. "Nov 1, 2026, 10:35 PM EDT". */
export function formatHomeDateTime(isoTimestamp: string): string {
  return homeDateTime.format(new Date(isoTimestamp));
}

/** Formats a zone-less YYYY-MM-DD string without shifting it across a day boundary. */
export function formatCalendarDate(isoDate: string): string {
  return calendarDate.format(new Date(`${isoDate}T00:00:00Z`));
}
