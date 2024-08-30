export function convertToDate(dateString: string): Date {
  const dateParts = dateString.split(' ');
  const timeParts = dateParts[4].split(':');

  const year = dateParts[3];
  const month = (
    'JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(dateParts[1]) / 3 +
    1
  )
    .toString()
    .padStart(2, '0');
  const day = dateParts[2].padStart(2, '0');
  const hours = timeParts[0].padStart(2, '0');
  const minutes = timeParts[1].padStart(2, '0');
  const seconds = timeParts[2].padStart(2, '0');
  const milliseconds = '000'; // Assuming fixed milliseconds

  // Format the date components into the desired string format
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  const dateObj = new Date(formattedDate);

  return dateObj;
}

export function addHoursToDate(date: Date, hoursToAdd: number): Date {
  // Check if the date is valid

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // Subtract hours to the date
  date.setHours(date.getHours() + hoursToAdd);

  return date;
}

export function subtractHoursToDate(date: Date, hoursToAdd: number): Date {
  // Check if the date is valid

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // Subtract hours to the date
  date.setHours(date.getHours() - hoursToAdd);

  return date;
}
