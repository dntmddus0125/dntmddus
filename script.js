window.addEventListener('load',()=>{

  // ===== 데이터 =====
  let diaries = [
    {id:1,date:"2025-12-22",content:"오늘은 진짜 귀여운 하루였다…"},
    {id:2,date:"2025-12-21",content:"비가 와서 기분이 이상했다."},
    {id:3,date:"2025-12-20",content:"친구랑 놀았다~ 재밌었다!"}
  ];

  const diaryGrid = document.querySelector('.diary-grid');
  const diaryListSection = document.getElementById('diary-list');
  const diaryViewSection = document.getElementById('diary-view');
  const diaryTitleEl = document.getElementById('diary-view-title');
  const diaryDateEl = document.getElementById('diary-view-date');
  const diaryContentEl = document.getElementById('diary-view-content');

  const adminBtn = document.getElementById('admin-btn');
  const addDiaryBtn = document.getElementById('add-diary-btn');
  const backBtn = document.getElementById('back-btn');
  const deleteBtn = document.querySelector('.delete-btn');

  let adminMode = false;
  let currentDiary = null;

  // ===== 시계 =====
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

  // ===== 테마 =====
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-default').addEventListener('click',()=>setTheme('default'));
  document.getElementById('theme-dark').addEventListener('click',()=>setTheme('dark'));
  document.getElementById('theme-pink').addEventListener('click',()=>setTheme('pink'));
  function setTheme(theme){document.body.setAttribute('data-theme',theme);localStorage.setItem('theme',theme);}

  // ===== 관리자 =====
  adminBtn.addEventListener('click', ()=>{
    if(adminMode){alert("이미 관리자 모드입니다."); return;}
    const pw = prompt("관리자 비밀번호를 입력하세요");
    if(pw === "0125"){adminMode=true; document.body.classList.add('admin'); alert("관리자 모드 활성화");}
    else alert("비밀번호가 틀렸습니다");
  });

  // ===== 렌더링 =====
  function renderDiaryList(){
    diaryGrid.innerHTML="";
    diaries.forEach(diary=>{
      const item=document.createElement('div');
      item.className='diary-item';
      item.textContent=diary.date;
      item.addEventListener('click', ()=>openDiary(diary));
      diaryGrid.appendChild(item);
    });
  }
  renderDiaryList();

  function openDiary(diary){
    currentDiary=diary;
    diaryListSection.style.display='none';
    diaryViewSection.style.display='block';
    diaryTitleEl.textContent=diary.date;
    diaryDateEl.textContent=diary.date;
    diaryContentEl.textContent=diary.content;
  }

  backBtn.addEventListener('click',()=>{
    diaryListSection.style.display='block';
    diaryViewSection.style.display='none';
  });

  // ===== 새 일기 작성 (날짜 직접 입력) =====
  addDiaryBtn.addEventListener('click', ()=>{
    if(!adminMode){alert("관리자 모드에서만 추가 가능합니다."); return;}

    const year = prompt("년을 입력하세요 (예: 2025)"); if(!year) return;
    const month = prompt("월을 입력하세요 (예: 12)"); if(!month) return;
    const day = prompt("일을 입력하세요 (예: 22)"); if(!day) return;
    const dateStr=`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    const existing = diaries.find(d => d.date===dateStr);
    if(existing){openDiary(existing); alert("이미 작성된 일기입니다!"); return;}

    const content = prompt(`${dateStr} 일기 내용을 입력하세요:`); if(!content) return;
    const newDiary = {id:diaries.length+1,date:dateStr,content:content};
    diaries.unshift(newDiary);
    renderDiaryList();
    generateCalendar();
    alert("새 일기가 추가되었습니다!");
  });

  // ===== 삭제 =====
  deleteBtn.addEventListener('click',()=>{
    if(!adminMode){alert("관리자 모드에서만 삭제 가능합니다."); return;}
    if(currentDiary && confirm("정말 삭제하시겠습니까?")){
      diaries = diaries.filter(d=>d.id!==currentDiary.id);
      renderDiaryList();
      diaryListSection.style.display='block';
      diaryViewSection.style.display='none';
      generateCalendar();
      alert("일기가 삭제되었습니다!");
    }
  });

  // ===== 캘린더 =====
  const calendarEl = document.getElementById('calendar');
  const calendarTitle = document.getElementById('calendar-title');

  function generateCalendar(){
    const now=new Date();
    const year=now.getFullYear();
    const month=now.getMonth();

    calendarTitle.textContent=`${year}년 ${month+1}월`;
    calendarEl.innerHTML="";

    const firstDay = new Date(year,month,1).getDay();
    const lastDate = new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){calendarEl.appendChild(document.createElement('div'));}
    for(let d=1; d<=lastDate; d++){
      const cell=document.createElement('div');
      cell.className='calendar-day';
      const dayStr=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      cell.textContent=d;

      if(diaries.find(di=>di.date===dayStr)) cell.style.background='#ffeb99';
      cell.addEventListener('click', ()=>{
        const diary = diaries.find(di=>di.date===dayStr);
        if(diary) openDiary(diary);
        else alert(`${dayStr} 일기가 없습니다.\n오른쪽 위 '+ 새 일기' 버튼을 눌러 작성해주세요.`);
      });

      calendarEl.appendChild(cell);
    }
  }
  generateCalendar();

});
