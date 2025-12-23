<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>웅니의 미니홈피</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">

    <!-- 왼쪽 바 -->
    <aside class="left-bar">

      <!-- 사이트 제목 -->
      <div class="site-title">우승연 아카이브</div>

      <!-- 아바타 -->
      <div class="avatar-box">아바타</div>

      <!-- 날짜 & 시계 -->
      <div class="time-box">
        <div id="date"></div>
        <div id="clock"></div>
      </div>

      <!-- 캘린더 -->
      <div class="calendar-box">
        <div class="calendar-header" id="calendar-title"></div>
        <div class="calendar-grid" id="calendar"></div>
      </div>

      <!-- 테마 선택 -->
      <div class="theme-box">
        <div class="theme-title">테마</div>
        <button onclick="setTheme('default')">기본</button>
        <button onclick="setTheme('dark')">다크</button>
        <button onclick="setTheme('pink')">핑크</button>
      </div>

      <!-- 관리자 -->
      <div class="admin-box">
        <button onclick="enterAdmin()">관리자</button>
      </div>

    </aside>

    <!-- 오른쪽 바 -->
    <main class="right-bar">
      <h2>최근 일기</h2>

      <div class="diary-grid">

        <!-- 일기 카드 (샘플) -->
        <div class="diary-item" data-id="1">
          <div class="diary-title">일기 1</div>

          <!-- 관리자 모드에서만 보이게 될 버튼들 -->
          <div class="admin-controls">
            <button class="edit-btn">편집</button>
            <button class="delete-btn">삭제</button>
          </div>
        </div>

        <div class="diary-item" data-id="2">일기 2</div>
        <div class="diary-item" data-id="3">일기 3</div>

      </div>
    </main>

  </div>

  <script src="script.js"></script>
</body>
</html>
