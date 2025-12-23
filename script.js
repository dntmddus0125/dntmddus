document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // 데이터
  // =====================
  let diaries = [];

  let adminMode = false;
  const ADMIN_PASSWORD = "0125";

  // =====================
  // 시계
  // =====================
  function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
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
  // 테마
  // =====================
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.setAttribute('data-theme', savedTheme);
  window.setTheme = setTheme; // 전역에서도 사용 가능

  // =====================
  // 캘린더
  // =====================
  function generateCalendar(monthOffset = 0) {
    const calendar = document.getElementById('calendar');
    const title = document.getElementById('calendar-title');
    const now = new Date();
    now.setMonth(now.getMonth() + monthOffset);

    const year = now.getFullYear();
    const month = now.getMonth();

    title.textContent = `${year}년 ${month+1}월`;
    calendar.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month+1, 0).getDate();

    for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));

    for(let d=1; d<=lastDate; d++){
      const cell = document.createElement('div');
      cell.className = 'calendar-day';
      cell.textContent = d;

      // 일기 있으면 표시
      const diaryExists = diaries.some(di => di.date === `${year}년 ${month+1}월 ${d}일`);
      if(diaryExists) cell.classList.add('has-diary');

      cell.onclick = () => openDiaryByDate(year, month+1, d);
      calendar.appendChild(cell);
    }
  }
  generateCalendar();

  // =====================
  // 관리자 모드
  // =====================
  function enterAdmin() {
    const input = prompt("관리자 비밀번호 입력");
    if(input === ADMIN_PASSWORD){
      adminMode = true;
      document.body.classList.add("admin");
      alert("관리자 모드 활성화!");
    } else alert("비밀번호 틀림");
  }
  window.enterAdmin = enterAdmin; // 버튼 클릭용 전역

  // =====================
  // 일기 기능
  // =====================
  function renderDiaryList() {
    const list = document.getElementById('diary-list');
    list.innerHTML = '';
    diaries.forEach(diary=>{
      const item = document.createElement('div');
      item.className = 'diary-item';
      item.textContent = diary.date;
      item.onclick = ()=> openDiary(diary.date, diary.content, diary.images);
      list.appendChild(item);
    });
  }

  function openDiary(date, content, images=[]){
    document.getElementById('diary-list').style.display = 'none';
    const view = document.getElementById('diary-view');
    view.style.display = 'block';
    document.getElementById('diary-view-date').textContent = date;
    document.getElementById('diary-view-content').textContent = content;

    const imgDiv = document.getElementById('diary-view-images');
    imgDiv.innerHTML = '';
    images.forEach(src=>{
      const img = document.createElement('img');
      img.src = src;
      imgDiv.appendChild(img);
    });
  }
  window.openDiary = openDiary;

  function backToList(){
    document.getElementById('diary-list').style.display = 'block';
    document.getElementById('diary-view').style.display = 'none';
  }
  window.backToList = backToList;

  function addNewDiary(){
    if(!adminMode) return alert("관리자 모드에서만 가능");

    const year = prompt("연도 입력 (예: 2025)");
    const month = prompt("월 입력 (예: 12)");
    const day = prompt("일 입력 (예: 22)");

    const content = prompt("일기 내용을 입력하세요");
    const imagesInput = prompt("사진 URL을 , 로 구분해서 넣으세요 (없으면 비워두기)");

    const newDiary = {
      date: `${year}년 ${month}월 ${day}일`,
      content: content || '',
      images: imagesInput ? imagesInput.split(',') : []
    };
    diaries.unshift(newDiary);
    renderDiaryList();
    generateCalendar();
    alert("일기 추가 완료!");
  }
  window.addNewDiary = addNewDiary;

  function openDiaryByDate(y,m,d){
    const diary = diaries.find(di => di.date === `${y}년 ${m}월 ${d}일`);
    if(diary) openDiary(diary.date, diary.content, diary.images);
    else alert(`${y}년 ${m}월 ${d}일 일기 없음`);
  }

});
