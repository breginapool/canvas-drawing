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

canvas.addEventListener('pointermove', draw)
canvas.addEventListener('pointerdown', (e) => {
  isDrawing = true
  lastX = e.offsetX
  lastY = e.offsetY
})
canvas.addEventListener('pointerup', () => (isDrawing = false))
canvas.addEventListener('pointerout', () => (isDrawing = false))

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
const btn1 = document.querySelector('.btn-fancy')

const btn2 = document.querySelector('.btn-reset')

btn1.addEventListener('click', () => (ctx.globalCompositeOperation = 'xor'))
btn2.addEventListener('click', () => {
  window.location.reload()
})
