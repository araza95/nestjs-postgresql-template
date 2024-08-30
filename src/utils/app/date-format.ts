export function formatClockInTime(time: Date | string): {
  formattedDate: string;
  formattedTime: string;
} {
  let clockInTime: Date;

  // Ensure the input is a Date object
  if (time instanceof Date) {
    clockInTime = time;
  } else if (typeof time === 'string') {
    clockInTime = new Date(time);
  } else {
    throw new Error('Invalid clockInTime format');
  }

  // Extract and format the date (MM/DD/YY)
  const year = clockInTime.getFullYear().toString();
  const month = (clockInTime.getMonth() + 1).toString().padStart(2, '0');
  const day = clockInTime.getDate().toString().padStart(2, '0');
  const formattedDate = `${month}/${day}/${year}`;

  // Extract and format the time (HHMM)
  const hours = clockInTime.getHours().toString().padStart(2, '0');
  const minutes = clockInTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}${minutes}`;

  return {
    formattedDate: formattedDate,
    formattedTime: formattedTime,
  };
}

export function convertDateFormat(dateStr: string): string {
  // Regular expression to check if the date is in DD/MM/YYYY format
  const ddMmYyyyRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  // Check if the date string matches the DD/MM/YYYY format
  const match = dateStr.match(ddMmYyyyRegex);

  if (match) {
    // Convert to YYYY-MM-DD format
    return `${match[3]}-${match[2]}-${match[1]}`;
  }

  // Return the original date string if it doesn't match the DD/MM/YYYY format
  return dateStr;
}
