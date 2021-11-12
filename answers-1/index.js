// Код, использующий метод Монте-Карло для получения
// графической иллюстрации размещения зон,
// определяемых функцией getVector()

const canvas = document.getElementById("canvas")

const canvasWidth = 401
const canvasHeight = 401

canvas.setAttribute('width', canvasWidth)
canvas.setAttribute('height', canvasHeight)

const ctx = canvas.getContext('2d')
ctx.lineWidth = 1
ctx.strokeStyle = '#0000ff'

const shiftX = canvasWidth / 2
const shiftY = canvasHeight / 2

const paintAxisX = () => {
  ctx.beginPath()
  ctx.moveTo(0, shiftY)
  ctx.lineTo(canvasWidth, shiftY)
  ctx.closePath()
  ctx.stroke()
}

const paintAxisY = () => {
  ctx.beginPath()
  ctx.moveTo(shiftX, 0)
  ctx.lineTo(shiftX, canvasHeight)
  ctx.closePath()
  ctx.stroke()
}

const paintPoint = ({ x, y, color }) => {
  ctx.fillStyle = color

  ctx.beginPath()
  ctx.arc(x + shiftX, shiftY - y, 0.707, 0, Math.PI * 2, false)
  ctx.closePath()
  ctx.fill()
}

paintAxisX()
paintAxisY()

const THRESHOLD = 0.5

const getVector = ({ x, y }) => {
  if (x > y) {
    if (Math.abs(x / y) < THRESHOLD) return
    return x > 0 ? 3 : 1
  } else {
    if (Math.abs(y / x) < THRESHOLD) return
    return y > 0 ? 2 : 0
  }
}

const paintVectorPoint = ({ x, y }) => {
  const vectorIndex = getVector({ x, y })

  if (isNaN(vectorIndex)) {
    return
  }

  let color

  switch (vectorIndex) {
    case 0:
      color = '#8c05ad'
      break;
    case 1:
      color = '#3f007f' // 
      break;
    case 2:
      color = '#5f3700'
      break;
    case 3:
      color = '#1f3f00'
      break;
  }

  paintPoint({ x, y, color })
}

for (let i = 0; i < 100000; i++) {
  const x = Math.random() * 600 - 300
  const y = Math.random() * 600 - 300

  paintVectorPoint({ x, y })
}
