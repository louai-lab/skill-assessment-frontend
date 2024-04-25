export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} ${formattedTime}`;
}
