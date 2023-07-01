/**
 * 테트리스 만들기
 * 
 * 도형 표출
 * 
 * 도형 내려오기!
 * 
 * 도형 움직이기!
 * 
 * 도형 한번에 내리기
 * 
 * 도형 돌리기
 * 
 * 도형 쌓이기!
 * 
 * 도형 새로생성!
 * 
 * 한줄 지우기
 * 
 * 게임판 그리기!
 * 
 */

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
  let score;

  // 현재 도형 위치
  let currentX = 5;
  let currentY = 1;

  let fillPlace = [];
  
  const cell_arr = document.querySelectorAll('cell');
  
  // 게임 초기화
  function init() {
    // 게임 상태 초기화
    grid = createGrid(10, 20);
    drawGame();
    newShape();
  
    setInterval(() => {

      if(isBlockDown()){
        stackShape();
        newShape();
      }

      eraseShape(currentX,currentY);
      currentY++;
      clearFunction();
      drawShape();
    }, 500);
  }
  
  // 위치 저장
// 지운다 -> 한 칸 내린다 -> 그린다

  // 게임판 그리기
  function drawGame() {
    gameArea.innerHTML = '';

    if(currentY == 19){
      newShape();
      stackShape();
      console.log("19줄");
    }
  
    // 게임 영역 그리기
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = document.createElement('div');
        cell.id = `${col}/${row}`;
        cell.className = 'cell';
        gameArea.appendChild(cell);
      }
    }
  }

  // 도형 쌓이기 (given - when - then)
  // 사용자가 취할 수 있는 액션(when)
  // 그 액션을 취하면 벌어지는 일(then)
  // 그 액션을 하기 위한 선행조건(given)
  // 새로운 도형 추가 - then
  // 기존 위치 저장 - then
  function stackShape() {
    fillPlace.push({x:currentX,y:currentY});
  }

  // 새로운 도형
  function newShape(){
    currentX = 5;
    currentY = 1;
  }

  // 도형 그리기
  function drawShape(){
   let nowShape =  document.getElementById(`${currentX}/${currentY}`);
    nowShape.classList.add("cell_i");
  }

  // 도형 지우기
  function eraseShape(x, y){
    let nowShape =  document.getElementById(`${x}/${y}`);
    nowShape.classList.remove("cell_i");
  }

  // 블록 막힘
  function isBlockLeft(){
    if(currentX===0 || isExistShapeLeft()){
      return true;
    }
    return false;
  }

  function isExistShapeLeft() {
    for(let i =0; i<fillPlace.length;i++){
        if(currentX === fillPlace[i].x+1 && currentY === fillPlace[i].y){
          return true;
        }
      }
  }

  function isBlockRight(){
    if(currentX===9 || isExistShapeRight()){
      return true;
    }
    return false;
  }

  function isExistShapeRight() {
    for(let i =0; i<fillPlace.length;i++){
        if(currentX === fillPlace[i].x-1 && currentY === fillPlace[i].y){
          return true;
        }
      }
  }


  function isBlockDown(){
    if(currentY===19){
      return true;
    }
    for(let i =0; i<fillPlace.length;i++){
      if(currentX === fillPlace[i].x && currentY === fillPlace[i].y-1){
        return true;
      }
    }

    return false;
  }

  // 줄 지우기
  // 남은 도형들 한 칸 내리기
  function clearFunction(){
    if(isFullRow()){
      eraseRow();
      downRestShape();
    }
  }


  function eraseRow(){
    fillPlace = fillPlace.filter(shape => !(shape.y === 19));
    fillPlace = fillPlace.map(shape => eraseShape(shape.x,shape.y))
  }

  function downRestShape() {
    fillPlace = fillPlace.map(shape => shape.y++ );
  }

  function isFullRow() {
    const row = fillPlace.filter(shape => (shape.y===19))
    if(row.length ===9){
      return true;
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
  
  // 방향키 움직이기
  window.addEventListener("keydown", (e) => {
    eraseShape(currentX,currentY);
    if(e.key == 37 || e.key == "ArrowRight") {
      if(!isBlockRight()){
        currentX ++;
      }
    }
    else if(e.key == 39 || e.key == "ArrowLeft") {
      if(!isBlockLeft()){
        currentX --;
      }
    }
    else if(e.key == 40 || e.key == "ArrowDown") {
      if(!isBlockDown()){
        currentY ++;
      }
    }
    drawShape();
  });

  // 게임 초기화
  function startGame() {
    init();
    
  }