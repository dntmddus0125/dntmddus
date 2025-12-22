function updateClock() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateString = `${year}년 ${month}월 ${date}일`;
  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById('date').textContent = dateString;
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();
