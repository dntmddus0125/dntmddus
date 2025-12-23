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

function generateCalendar() {
  const calendar = document.getElementById('calendar');
  const title = document.getElementById('calendar-title');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0부터 시작

  title.textContent = `${year}년 ${month + 1}월`;
  calendar.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 요일 빈칸
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  // 날짜 생성
  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('div');
    cell.textContent = day;
    cell.className = 'calendar-day';

    cell.onclick = () => {
      alert(`${year}년 ${month + 1}월 ${day}일 일기`);
    };

    calendar.appendChild(cell);
  }
}

generateCalendar();

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// 페이지 열릴 때 마지막 테마 적용
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.setAttribute('data-theme', savedTheme);
} else {
  document.body.setAttribute('data-theme', 'default');
}
