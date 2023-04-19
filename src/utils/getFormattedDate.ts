const defaultOption = {};

export function getFormattedDate(date: Date | string) {
  let dateToFormat = date;
  if (typeof dateToFormat === 'string') {
    dateToFormat = new Date(dateToFormat);
  }

  return Intl.DateTimeFormat('ru-RU', defaultOption).format(dateToFormat);
}
