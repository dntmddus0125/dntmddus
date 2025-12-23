/* =====================
   날짜 & 시계
===================== */
function updateClock() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  document.getElementById('date').textContent =
    `${year}년 ${month}월 ${day}일`;

  document.getElementById('clock').textContent =
    `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();


/* =====================
   캘린더 생성
===================== */
function generateCalendar() {
  const calendar = document.getElementById('calendar');
  const title = document.getElementById('calendar-title');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  title.textContent = `${year}년 ${month + 1}월`;
  calendar.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 빈칸
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  // 날짜
  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.textContent = day;

    cell.onclick = () => {
      alert(`${year}년 ${month + 1}월 ${day}일 일기`);
    };

    calendar.appendChild(cell);
  }
}

generateCalendar();


/* =====================
   테마 기능
===================== */
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem('theme') || 'default';
document.body.setAttribute('data-theme', savedTheme);


/* =====================
   관리자 모드
===================== */
let adminMode = false;
const ADMIN_PASSWORD = "0125";

function enterAdmin() {
  const input = prompt("관리자 비밀번호를 입력하세요");

  if (input === ADMIN_PASSWORD) {
    adminMode = true;
    document.body.classList.add("admin");
    alert("관리자 모드 활성화");
  } else {
    alert("비밀번호가 틀렸습니다");
  }
}

function openDiary(title, date, content) {
  // 목록 숨기기
  document.querySelector('.diary-grid').style.display = 'none';

  // 본문 보이기
  const view = document.getElementById('diary-view');
  view.style.display = 'block';

  document.getElementById('diary-view-title').textContent = title;
  document.getElementById('diary-view-date').textContent = date;
  document.getElementById('diary-view-content').textContent = content;
}

function backToList() {
  document.querySelector('.diary-grid').style.display = 'grid';
  document.getElementById('diary-view').style.display = 'none';
}
