document.addEventListener('DOMContentLoaded', () => {

  let currentDiary = null;
  let adminMode = false;
  const ADMIN_PASSWORD = "0125";

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
  function renderDiaryList(){
    const grid = document.querySelector('.diary-grid');
    grid.innerHTML = "";
    diaries.forEach(diary => {
      const item = document.createElement('div');
      item.className = "diary-item";
      item.textContent = diary.title;
      item.onclick = () => openDiary(diary);
      grid.appendChild(item);
    });
  }
  renderDiaryList();

  // =====================
  // 시계
  // =====================
  function updateClock(){
    const now = new Date();
    const y=now.getFullYear(), m=now.getMonth()+1, d=now.getDate();
    const h=String(now.getHours()).padStart(2,'0');
    const min=String(now.getMinutes()).padStart(2,'0');
    const s=String(now.getSeconds()).padStart(2,'0');
    document.getElementById('date').textContent=`${y}년 ${m}월 ${d}일`;
    document.getElementById('clock').textContent=`${h}:${min}:${s}`;
  }
  setInterval(updateClock,1000); updateClock();

  // =====================
  // 캘린더
  // =====================
  function generateCalendar(){
    const calendar = document.getElementById('calendar');
    const title = document.getElementById('calendar-title');
    const now = new Date();
    const year=now.getFullYear(), month=now.getMonth();
    title.textContent=`${year}년 ${month+1}월`;
    calendar.innerHTML="";
    const firstDay=new Date(year,month,1).getDay();
    const lastDate=new Date(year,month+1,0).getDate();
    for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));
    for(let day=1; day<=lastDate; day++){
      const cell=document.createElement('div');
      cell.className='calendar-day';
      cell.textContent=day;
      cell.onclick=()=>alert(`${year}년 ${month+1}월 ${day}일 일기`);
      calendar.appendChild(cell);
    }
  }
  generateCalendar();

  // =====================
  // 테마
  // =====================
  window.setTheme=(theme)=>{
    document.body.setAttribute('data-theme',theme);
    localStorage.setItem('theme',theme);
  }
  const savedTheme=localStorage.getItem('theme')||'default';
  document.body.setAttribute('data-theme',savedTheme);

  // =====================
  // 관리자 모드
  // =====================
  window.enterAdmin=()=>{
    const input=prompt("관리자 비밀번호를 입력하세요");
    if(input===ADMIN_PASSWORD){ adminMode=true; document.body.classList.add('admin'); alert("관리자 모드 활성화"); }
    else alert("비밀번호가 틀렸습니다");
  };

  // =====================
  // 일기 열기 / 목록으로
  // =====================
  window.openDiary=(diary)=>{
    currentDiary=diary;
    document.getElementById('diary-list').style.display='none';
    const view=document.getElementById('diary-view');
    view.style.display='block';
    document.getElementById('diary-view-title').textContent=diary.title;
    document.getElementById('diary-view-date').textContent=diary.date;
    document.getElementById('diary-view-content').textContent=diary.content;
  }
  window.backToList=()=>{
    document.getElementById('diary-list').style.display='block';
    document.getElementById('diary-view').style.display='none';
  }

  // =====================
  // 블로그 스타일 에디터
  // =====================
  window.openEditor=(diary=null)=>{
    const modal=document.getElementById('editor-modal');
    modal.style.display='block';
    if(diary){
      currentDiary=diary;
      document.getElementById('editor-title').textContent='일기 편집';
      document.getElementById('editor-input-title').value=diary.title;
      document.getElementById('editor-input-content').value=diary.content;
    } else {
      currentDiary=null;
      document.getElementById('editor-title').textContent='새 일기 작성';
      document.getElementById('editor-input-title').value='';
      document.getElementById('editor-input-content').value='';
    }
  }
  window.closeEditor=()=>document.getElementById('editor-modal').style.display='none';

  window.saveDiary=()=>{
    const title=document.getElementById('editor-input-title').value.trim();
    const content=document.getElementById('editor-input-content').value.trim();
    if(!title||!content) return alert('제목과 내용을 모두 입력해주세요!');
    const date=new Date();
    const formattedDate=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;

    if(currentDiary){
      currentDiary.title=title;
      currentDiary.content=content;
      openDiary(currentDiary);
    } else {
      diaries.unshift({id:diaries.length+1, title, content, date:formattedDate, image:null});
    }
    renderDiaryList();
    closeEditor();
  }

  // =====================
  // 편집 / 삭제 연결
  // =====================
  window.deleteDiary=(id)=>{
    if(!adminMode) return alert("관리자 모드에서만 삭제 가능합니다.");
    const index=diaries.findIndex(d=>d.id===id);
    if(index===-1) return;
    if(confirm("정말 삭제하시겠습니까?")){
      diaries.splice(index,1);
      renderDiaryList();
      backToList();
    }
  }

});
