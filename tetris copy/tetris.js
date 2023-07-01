// 테트리스 블록 모양 정의
const SHAPES = [
    [[1, 1, 1, 1]], // I 블록
    [[1, 1], [1, 1]], // O 블록
    [[1, 1, 0], [0, 1, 1]], // S 블록
    [[0, 1, 1], [1, 1, 0]], // Z 블록
    [[1, 1, 1], [0, 1, 0]], // T 블록
    [[1, 1, 1], [1, 0, 0]], // L 블록
    [[1, 1, 1], [0, 0, 1]] // J 블록
  ];
  
  // 게임 영역과 스코어 요소 가져오기
  const gameArea = document.querySelector('.game-area');
  const scoreElement = document.querySelector('.score');
  
  // 게임 상태 변수
  let grid;
  let currentShape;
  let currentX;
  let currentY;
  let score;
  
  // 게임 초기화
  function init() {
    // 게임 상태 초기화
    grid = createGrid(10, 20);
    currentShape = getRandomShape();
    currentX = Math.floor(grid[0].length / 2) - Math.floor(currentShape[0][0].length / 2);
    currentY = 0;
    score = 0;
  
    // 게임 루프 시작
    setInterval(updateGame, 500);
  
    drawGame();
  }
  
  // 게임 그리기
  function drawGame() {
    gameArea.innerHTML = '';
  
    // 현재 블록 그리기
    drawShape(currentShape, currentX, currentY);
  
    // 게임 영역 그리기
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.style.backgroundColor = 'cyan';
          gameArea.appendChild(cell);
        } else {
          const cell = document.createElement('div');
          cell.className = 'cell';
          gameArea.appendChild(cell);
        }
      }
    }
  
    // 스코어 업데이트
    scoreElement.textContent = `Score: ${score}`;
  }
  
  // 블록 그리기
  function drawShape(shape, offsetX, offsetY) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.style.backgroundColor = 'cyan';
          cell.style.top = `${(offsetY + row) * 20}px`;
          cell.style.left = `${(offsetX + col) * 20}px`;
          gameArea.appendChild(cell);
        }
      }
    }
  }
  function updateGame() {
      
      // 블록이 바닥에 닿았는지 확인
      if (isColliding(currentShape, currentX, currentY + 1)) {
      // 블록을 게임 영역에 고정시킴
      placeShape(currentShape, currentX, currentY);
      // 줄이 완성되었는지 확인하고 제거
      clearLines();
      // 새로운 블록 생성
      currentShape = getRandomShape();
      currentX = Math.floor(grid[0].length / 2) - Math.floor(currentShape[0][0].length / 2);
      currentY = 0;
    } else {
        // 블록을 한 칸 아래로 이동
        currentY++;
    }
  
    drawGame();
  }
  
  // 블록을 게임 영역에 고정시킴
  function placeShape(shape, offsetX, offsetY) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          grid[offsetY + row][offsetX + col] = 1;
        }
      }
    }
  }
  
  // 줄이 완성되었는지 확인하고 제거
  function clearLines() {
    for (let row = grid.length - 1; row >= 0; row--) {
      if (grid[row].every(cell => cell !== 0)) {
        // 줄 삭제
        grid.splice(row, 1);
        // 맨 위에 빈 줄 추가
        grid.unshift(Array(grid[0].length).fill(0));
        // 점수 추가
        score += 10;
      }
    }
  }
  
  // 블록이 충돌하는지 확인
  function isColliding(shape, offsetX, offsetY) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (
          shape[row][col] !== 0 &&
          ((offsetY + row >= grid.length) || (offsetY + row >= 0 && grid[offsetY + row][offsetX + col] !== 0))
        ) {
          return true;
        }
      }
    }
    return false;
  }
  
  // 테트리스 블록 랜덤 선택
  function getRandomShape() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    return SHAPES[randomIndex];
  }
  
  // 게임 영역 생성
  function createGrid(width, height) {
    return Array.from({ length: height }, () => Array(width).fill(0));
  }
  
  // 게임 초기화
  init();