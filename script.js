document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // 일기 데이터
  // =====================
  const diaries = [
    { id:1, title:"일기 1", date:"2025-12-22", content:"오늘은 진짜 귀여운 하루였다…", image:null },
    { id:2, title:"일기 2", date:"2025-12-21", content:"비가 와서 기분이 이상했다.", image:null },
    { id:3, title:"일기 3", date:"2025-12-20", content:"친구랑 놀았다~ 재밌었다!", image:null }
  ];

  // =====================
  // 목록 렌더링
  // =====================
  function renderDiaryList() {
    const grid = document.querySelector('.diary-grid');
    grid.innerHTML = "";

    diaries.forEach(diary => {
      const item = document.createElement('div');
      item.className = "diary-item";
      item.textContent = diary.title;

      item.onclick = () => openDiary(diary.title, diary.date, diary.content);
      grid.appendChild(item);
    });
  }

  renderDiaryList();

  // =====================
  // 날짜 & 시계
  // =====================
  function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');

    document.getElementById('date').textContent = `${year}년 ${month}월 ${day}일`;
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // =====================
  // 캘린더 생성
  // =====================
  function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const title = document.getElementById('calendar-title');

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    title.textContent = `${year}년 ${month+1}월`;
    calendar.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month+1, 0).getDate();

    for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));

    for(let day=1; day<=lastDate; day++){
      const cell = document.createElement('div');
      cell.className = 'calendar-day';
      cell.textContent = day;
      cell.onclick = () => alert(`${year}년 ${month+1}월 ${day}일 일기`);
      calendar.appendChild(cell);
    }
  }

  generateCalendar();

  // =====================
  // 테마
  // =====================
  function setTheme(theme){
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.setAttribute('data-theme', savedTheme);

  // =====================
  // 관리자
  // =====================
  let adminMode = false;
  const ADMIN_PASSWORD = "0125";

  window.enterAdmin = () => {
    const input = prompt("관리자 비밀번호를 입력하세요");
    if(input === ADMIN_PASSWORD){
      adminMode = true;
      document.body.classList.add("admin");
      alert("관리자 모드 활성화");
    } else alert("비밀번호가 틀렸습니다");
  };

  // =====================
  // 일기 본문 열기 / 목록으로
  // =====================
  window.openDiary = (title,date,content) => {
    document.getElementById('diary-list').style.display = 'none';
    const view = document.getElementById('diary-view');
    view.style.display = 'block';
    document.getElementById('diary-view-title').textContent = title;
    document.getElementById('diary-view-date').textContent = date;
    document.getElementById('diary-view-content').textContent = content;
  }

  window.backToList = () => {
    document.getElementById('diary-list').style.display = 'block';
    document.getElementById('diary-view').style.display = 'none';
  }

  // =====================
  // 새 일기 추가
  // =====================
  window.addNewDiary = () => {
    if(!adminMode) return alert("관리자 모드에서만 추가 가능합니다.");
    const title = prompt("일기 제목을 입력하세요:");
    if(!title) return;
    const content = prompt("일기 내용을 입력하세요:");
    if(!content) return;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;

    diaries.unshift({id:diaries.length+1,title,title,date:formattedDate,content,image:null});
    renderDiaryList();
    alert("새 일기가 추가되었습니다!");
  }

});

// =====================
// 일기 편집
// =====================
window.editDiary = (diaryId) => {
  if(!adminMode) return alert("관리자 모드에서만 편집 가능합니다.");

  const diary = diaries.find(d => d.id === diaryId);
  if(!diary) return;

  const newTitle = prompt("제목 수정:", diary.title);
  if(!newTitle) return;
  const newContent = prompt("내용 수정:", diary.content);
  if(!newContent) return;

  diary.title = newTitle;
  diary.content = newContent;

  renderDiaryList();
  openDiary(diary.title, diary.date, diary.content);
};

// =====================
// 일기 삭제
// =====================
window.deleteDiary = (diaryId) => {
  if(!adminMode) return alert("관리자 모드에서만 삭제 가능합니다.");
  const index = diaries.findIndex(d => d.id === diaryId);
  if(index === -1) return;

  if(confirm("정말 삭제하시겠습니까?")) {
    diaries.splice(index, 1);
    renderDiaryList();
    backToList();
  }
};

let currentDiaryId = null;

window.openDiary = (title, date, content, id) => {
  currentDiaryId = id;
  document.getElementById('diary-list').style.display = 'none';
  const view = document.getElementById('diary-view');
  view.style.display = 'block';
  document.getElementById('diary-view-title').textContent = title;
  document.getElementById('diary-view-date').textContent = date;
  document.getElementById('diary-view-content').textContent = content;
};
