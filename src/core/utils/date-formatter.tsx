// Function to format visit date and calculate time left
function formatVisitDate(visitDate: string | null): string {
  if (!visitDate) return "No date specified";

  const visitDateTime = new Date(visitDate);
  const now = new Date();
  const timeLeft = visitDateTime.getTime() - now.getTime();

  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  let timeLeftMessage = "";
  if (timeLeft > 0) {
    timeLeftMessage = `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes left`;
  } else {
    timeLeftMessage = "Visit date has passed";
  }

  return `${visitDateTime.toLocaleDateString()} (${timeLeftMessage})`;
}

export { formatVisitDate };
