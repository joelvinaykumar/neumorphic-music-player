let arbitrarySpotX = parseInt(Math.random() * (25 - 0) + 0);
let arbitrarySpotY = parseInt(Math.random() * (25 - 0) + 0);
console.info("start point", arbitrarySpotX, arbitrarySpotY)
let lastPaintTime = 0
let speed = 2
let snake = [
  { x: 10, y: 12 }
]
let food = {
  x: 5, y: 6
}

function start(time) {
  window.requestAnimationFrame(start)
  // console.log(time)
  if((time - lastPaintTime)/1000 < 1/speed) return
  lastPaintTime = time
  initiateGame()
}

function initiateGame() {
  board.innerHTML = ""
  snake.forEach((e, i) => {
    snakeElement = document.createElement("div")
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x
    snakeElement.classList.add("food")
    board.appendChild(snakeElement)
  })
  foodElement = document.createElement("div")
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  snakeElement.classList.add("food")
  board.appendChild(foodElement)
}

window.requestAnimationFrame(start)

window.addEventListener("keydown", e => {
  console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      console.log("Moving up...")
      break;
    case "ArrowDown":
      console.log("Moving down...")
      break;
    case "ArrowLeft":
      console.log("Moving left...")
      break;
    case "ArrowRight":
      console.log("Moving right...")
      break;
    default:
      break;
  }
})