document.addEventListener('DOMContentLoaded', () => {

  let diaries = [
    {id:1,title:"일기 1",date:"2025-12-22",content:"오늘은 진짜 귀여운 하루였다…",image:null},
    {id:2,title:"일기 2",date:"2025-12-21",content:"비가 와서 기분이 이상했다.",image:null},
    {id:3,title:"일기 3",date:"2025-12-20",content:"친구랑 놀았다~ 재밌었다!",image:null}
  ];

  let currentDiary = null;
  let adminMode = false;
  const ADMIN_PASSWORD = "0125";

  const diaryGrid = document.querySelector('.diary-grid');
  const diaryListSection = document.getElementById('diary-list');
  const diaryViewSection = document.getElementById('diary-view');
  const diaryTitleEl = document.getElementById('diary-view-title');
  const diaryDateEl = document.getElementById('diary-view-date');
  const diaryContentEl = document.getElementById('diary-view-content');
  const diaryViewImg = document.getElementById('diary-view-img');

  const editorModal = document.getElementById('editor-modal');
  const editorTitle = document.getElementById('editor-title');
  const inputTitle = document.getElementById('editor-input-title');
  const inputContent = document.getElementById('editor-input-content');
  const inputImg = document.getElementById('editor-input-img');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  const backBtn = document.getElementById('back-btn');
  const editBtn = document.getElementById('edit-btn');
  const deleteBtn = document.getElementById('delete-btn');
  const addDiaryBtn = document.getElementById('add-diary-btn');

  const themeDefaultBtn = document.getElementById('theme-default');
  const themeDarkBtn = document.getElementById('theme-dark');
  const themePinkBtn = document.getElementById('theme-pink');
  const adminBtn = document.getElementById('admin-btn');

  // =====================
  // 목록 렌더링
  // =====================
  function renderDiaryList(){
    diaryGrid.innerHTML = "";
    diaries.forEach(diary=>{
      const item = document.createElement('div');
      item.className='diary-item';

      // 썸네일 포함
      const thumb = document.createElement('div');
      thumb.style.height='60px';
      thumb.style.width='80%';
      thumb.style.backgroundColor='#ddd';
      thumb.style.marginBottom='5px';
      thumb.style.display='flex';
      thumb.style.alignItems='center';
      thumb.style.justifyContent='center';
      thumb.style.fontSize='12px';
      thumb.style.color='#666';
      if(diary.image) {
        const imgEl = document.createElement('img');
        imgEl.src = diary.image;
        imgEl.style.maxHeight='60px';
        imgEl.style.maxWidth='100%';
        thumb.appendChild(imgEl);
      } else {
        thumb.textContent='썸네일';
      }

      const titleEl = document.createElement('div');
      titleEl.textContent = diary.title;
      titleEl.style.fontSize='12px';

      const dateEl = document.createElement('div');
      dateEl.textContent = diary.date;
      dateEl.style.fontSize='10px';
      dateEl.style.color='#888';

      item.appendChild(thumb);
      item.appendChild(titleEl);
      item.appendChild(dateEl);

      item.addEventListener('click',()=>openDiary(diary));
      diaryGrid.appendChild(item);
    });
  }
  renderDiaryList();

  // =====================
  // 시계
  // =====================
  function updateClock(){
    const now=new Date();
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
    const y = now.getFullYear(), m = now.getMonth();
    title.textContent=`${y}년 ${m+1}월`;
    calendar.innerHTML='';
    const firstDay=new Date(y,m,1).getDay();
    const lastDate=new Date(y,m+1,0).getDate();
    for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));
    for(let day=1;day<=lastDate;day++){
      const cell = document.createElement('div');
      cell.className='calendar-day';
      cell.textContent=day;
      cell.addEventListener('click',()=>alert(`${y}년 ${m+1}월 ${day}일 일기`));
      calendar.appendChild(cell);
    }
  }
  generateCalendar();

  // =====================
  // 테마
  // =====================
  function setTheme(theme){
    document.body.setAttribute('data-theme',theme);
    localStorage.setItem('theme',theme);
  }
  themeDefaultBtn.addEventListener('click',()=>setTheme('default'));
  themeDarkBtn.addEventListener('click',()=>setTheme('dark'));
  themePinkBtn.addEventListener('click',()=>setTheme('pink'));
  setTheme(localStorage.getItem('theme')||'default');

  // =====================
  // 관리자
  // =====================
  adminBtn.addEventListener('click',()=>{
    const pw = prompt("관리자 비밀번호를 입력하세요");
    if(pw===ADMIN_PASSWORD){ adminMode=true; document.body.classList.add('admin'); alert("관리자 모드 활성화"); }
    else alert("비밀번호가 틀렸습니다");
  });

  // =====================
  // 일기 열기/목록
  // =====================
  function openDiary(diary){
    currentDiary=diary;
    diaryListSection.style.display='none';
    diaryViewSection.style.display='block';
    diaryTitleEl.textContent=diary.title;
    diaryDateEl.textContent=diary.date;
    diaryContentEl.textContent=diary.content;
    if(diary.image){ diaryViewImg.src=diary.image; diaryViewImg.style.display='block'; }
    else diaryViewImg.style.display='none';
  }
  backBtn.addEventListener('click',()=>{
    diaryListSection.style.display='block';
    diaryViewSection.style.display='none';
  });

  // =====================
  // 블로그 스타일 에디터
  // =====================
  function openEditor(diary=null){
    editorModal.style.display='block';
    if(diary){
      currentDiary=diary;
      editorTitle.textContent='일기 편집';
      inputTitle.value=diary.title;
      inputContent.value=diary.content;
      inputImg.value='';
    } else {
      currentDiary=null;
      editorTitle.textContent='새 일기 작성';
      inputTitle.value='';
      inputContent.value='';
      inputImg.value='';
    }
  }
  function closeEditor(){ editorModal.style.display='none'; }
  addDiaryBtn.addEventListener('click',()=>{ if(adminMode) openEditor(); else alert("관리자 모드에서만 추가 가능합니다."); });

  saveBtn.addEventListener('click',()=>{
    const title=inputTitle.value.trim();
    const content=inputContent.value.trim();
    if(!title||!content){ alert("제목과 내용을 모두 입력해주세요!"); return; }
    const reader = new FileReader();
    reader.onload = ()=>{
      const imgSrc = reader.result;
      const dateObj = new Date();
      const formattedDate=`${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')}`;
      if(currentDiary){
        currentDiary.title=title;
        currentDiary.content=content;
        if(inputImg.files[0]) currentDiary.image=imgSrc;
        openDiary(currentDiary);
      } else {
        diaries.unshift({id:diaries.length+1,title,content,date:formattedDate,image:inputImg.files[0]?imgSrc:null});
      }
      renderDiaryList();
      closeEditor();
    };
    if(inputImg.files[0]) reader.readAsDataURL(inputImg.files[0]);
    else reader.onload(); // 이미지 없으면 바로 저장
  });

  cancelBtn.addEventListener('click',closeEditor);

  // 편집/삭제
  editBtn.addEventListener('click',()=>{ if(adminMode) openEditor(currentDiary); });
  deleteBtn.addEventListener('click',()=>{
    if(!adminMode){ alert("관리자 모드에서만 삭제 가능합니다."); return; }
    if(currentDiary && confirm("정말 삭제하시겠습니까?")){
      diaries=diaries.filter(d=>d.id!==currentDiary.id);
      renderDiaryList();
      diaryListSection.style.display='block';
      diaryViewSection.style.display='none';
    }
  });

});
