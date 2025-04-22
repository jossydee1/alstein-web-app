// takes 2023-08-21T09:00:00.322Z and returns 21st Aug, 2023
export function formatIOSToDate(date: string): string {
  if (typeof date !== "string") return "";

  const dateString = date;
  const newDate = new Date(dateString);

  const formattedDate = `${newDate?.toLocaleString("en-US", {
    month: "short",
  })} ${newDate?.getDate()}, ${newDate?.getFullYear()}`;

  return formattedDate;
}

// takes 2023-08-21T09:00:00.322Z and returns 21st Aug, 2023, 09:00 AM
export function formatIOSToDateAndTime(date: string): string {
  if (typeof date !== "string") return "";

  const dateString = date;
  const newDate = new Date(dateString);

  const formattedDate = `${newDate?.toLocaleString("en-US", {
    month: "short",
  })} ${newDate?.getDate()}, ${newDate?.getFullYear()}, ${newDate?.toLocaleString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
  )}`;

  return formattedDate;
}

// takes HH:MM and returns HH:MM AM/PM
export const formatTimeTo12Hour = (time: string): string => {
  if (typeof time !== "string") return "";

  const [hour, minute] = time.split(":").map(Number);

  const period = hour >= 12 ? "PM" : "AM";

  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

// takes in "2025-03-25T21:24:07.913Z" and returns 2hrs ago, a week ago, a month ago, a year ago
export const formatDateToRelativeTime = (date: string): string => {
  if (typeof date !== "string") return "";

  const newDate = new Date(date);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - newDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

// in "2025-03-25T21:24:07.913Z" and returns how many years from now in numbers
export const formatDateToRelativeTimeYearWithTime = (date: string): string => {
  if (typeof date !== "string") return "";

  const newDate = new Date(date);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - newDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  return `${years}`;
};

// takes in date and time and returns a formatted string
// e.g. 2023-08-21T09:00:00.322Z and { hours: "09", minutes: "00" } returns 21st Aug, 2023 at 09:00 AM
export const formatDateTime = (
  date: Date | undefined,
  time: { hours: string; minutes: string },
) => {
  if (!date) return "";

  const period = Number(time.hours) >= 12 ? "PM" : "AM";
  const formattedHour = Number(time.hours) % 12 || 12;

  return `${date.toLocaleDateString()} at ${formattedHour}:${time?.minutes} ${period}`;
};
