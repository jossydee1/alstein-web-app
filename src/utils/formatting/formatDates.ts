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
