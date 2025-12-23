document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // 일기 데이터
  // =====================
  let diaries = [
    {id:1, title:"일기 1", date:"2025-12-22", content:"오늘은 진짜 귀여운 하루였다…", image:null},
    {id:2, title:"일기 2", date:"2025-12-21", content:"비가 와서 기분이 이상했다.", image:null},
    {id:3, title:"일기 3", date:"2025-12-20", content:"친구랑 놀았다~ 재밌었다!", image:null}
  ];

  // =====================
  // 요소 선택
  // =====================
  const diaryListSection = document.getElementById('diary-list');
  const diaryViewSection = document.getElementById('diary-view');
  const diaryGrid = document.createElement('div');
  diaryGrid.className = 'diary-grid';
  diaryListSection.appendChild(diaryGrid);

  const diaryTitleEl = document.getElementById('diary-view-title');
  const diaryDateEl = document.getElementById('diary-view-date');
  const diaryContentEl = document.getElementById('diary-view-content');

  const addDiaryBtn = document.getElementById('add-diary-btn');
  const adminBtn = document.getElementById('admin-btn');
  const editBtn = document.querySelector('.edit-btn');
  const deleteBtn = document.querySelector('.delete-btn');
  const backBtn = document.querySelector('button[onclick="backToList()"]');

  let adminMode = false;
  const ADMIN_PASSWORD = "0125";
  let currentDiary = null;

  // =====================
  // 관리자 모드: 세션 유지
  // =====================
  if(sessionStorage.getItem('adminMode')==='true'){
    adminMode=true;
    document.body.classList.add('admin');
  }

  adminBtn.addEventListener('click',()=>{
    if(adminMode){ alert("이미 관리자 모드입니다."); return; }
    const pw = prompt("관리자 비밀번호를 입력하세요");
    if(pw===ADMIN_PASSWORD){
      adminMode=true;
      document.body.classList.add('admin');
      sessionStorage.setItem('adminMode','true');
      alert("관리자 모드 활성화");
    } else alert("비밀번호가 틀렸습니다");
  });

  // =====================
  // 시계 업데이트
  // =====================
  function updateClock(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const day = now.getDate();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');

    document.getElementById('date').textContent=`${year}년 ${month}월 ${day}일`;
    document.getElementById('clock').textContent=`${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock,1000);
  updateClock();

  // =====================
  // 테마 기능
  // =====================
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.setAttribute('data-theme', savedTheme);

  window.setTheme = function(theme){
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // =====================
  // 일기 목록 렌더링
  // =====================
  function renderDiaryList(){
    diaryGrid.innerHTML="";
    diaries.forEach(diary=>{
      const item = document.createElement('div');
      item.className='diary-item';
      item.textContent=diary.title ? diary.title : diary.date; // 제목 없으면 날짜 표시
      item.addEventListener('click',()=>openDiary(diary));
      diaryGrid.appendChild(item);
    });
  }
  renderDiaryList();

  // =====================
  // 일기 열기 / 목록 돌아가기
  // =====================
  window.openDiary = function(diary){
    currentDiary=diary;
    diaryListSection.style.display='none';
    diaryViewSection.style.display='block';
    diaryTitleEl.textContent=diary.title ? diary.title : diary.date;
    diaryDateEl.textContent=diary.date;
    diaryContentEl.textContent=diary.content;
  };

  window.backToList = function(){
    diaryListSection.style.display='block';
    diaryViewSection.style.display='none';
  };

  // =====================
  // 새 일기 추가 (관리자 전용)
  // =====================
  window.addNewDiary = function(){
    if(!adminMode){ alert("관리자 모드에서만 추가 가능합니다."); return; }
    const content = prompt("일기 내용을 입력하세요:");
    if(!content) return;

    const date = prompt("일기를 쓸 날짜를 입력하세요 (YYYY-MM-DD):");
    if(!date) return;

    diaries.unshift({
      id: diaries.length+1,
      title: "",
      content: content,
      date: date,
      image: null
    });
    renderDiaryList();
    alert("새 일기가 추가되었습니다!");
  };

  // =====================
  // 삭제 기능
  // =====================
  deleteBtn.addEventListener('click',()=>{
    if(!adminMode){ alert("관리자 모드에서만 삭제 가능합니다."); return; }
    if(currentDiary && confirm("정말 삭제하시겠습니까?")){
      diaries=diaries.filter(d=>d.id!==currentDiary.id);
      renderDiaryList();
      backToList();
      alert("일기가 삭제되었습니다!");
    }
  });

});
