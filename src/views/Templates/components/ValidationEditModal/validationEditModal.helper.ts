export function isDateOrDateTime(apiFormat: String) {
  let format = 'datetime';
  const dateFormats = ['DAY_MONTH_YEAR', 'MONTH_YEAR', 'DAY_MONTH'];
  const timeFormats = [
    'HOURS_ONLY',
    'MINUTES_ONLY',
    'SECONDS_ONLY',
    'HOURS_MINUTES_SECONDS',
    'HOURS_MINUTES',
    'MINUTES_SECONDS',
  ];
  if (dateFormats.includes(apiFormat)) {
    format = 'date';
  }
  if (timeFormats.includes(apiFormat)) {
    format = 'time';
  }
  return format;
}
