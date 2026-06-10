const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

export function formatTime(date: Date) {
  return timeFormatter.format(date);
}

export function formatTimeRange(start: Date, end: Date) {
  return `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;
}
