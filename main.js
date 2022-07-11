const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 50
ctx.globalCompositeOperation = 'source-over'

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
// let direction = true

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  lastX = e.offsetX
  lastY = e.offsetY
})
canvas.addEventListener('mouseup', () => (isDrawing = false))
canvas.addEventListener('mouseout', () => (isDrawing = false))

// for touch screens
canvas.addEventListener('touchmove', draw)
canvas.addEventListener('touchdown', (e) => {
  isDrawing = true
  lastX = e.offsetX
  lastY = e.offsetY
})
canvas.addEventListener('touchup', () => (isDrawing = false))

function draw(e) {
  if (!isDrawing) return
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath()
  // start from
  ctx.moveTo(lastX, lastY)
  // go to
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
  lastX = e.offsetX
  lastY = e.offsetY
  hue++
  if (hue >= 360) {
    hue = 0
  }
  // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  //   direction = !direction
  // }
  // if (direction) {
  //   ctx.lineWidth++
  // } else {
  //   ctx.lineWidth--
  // }
}

// button functionality
document.querySelector('.btn-normal').onclick = function () {
  ctx.globalCompositeOperation = 'source-over'
}
document.querySelector('.btn-erase').onclick = function () {
  ctx.globalCompositeOperation = 'destination-out'
}
document.querySelector('.btn-xor').onclick = function () {
  ctx.globalCompositeOperation = 'xor'
}
