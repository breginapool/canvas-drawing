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

// Set up touch events for mobile, etc
canvas.addEventListener(
  'touchstart',
  function (e) {
    mousePos = getTouchPos(canvas, e)
    var touch = e.touches[0]
    var mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
    canvas.dispatchEvent(mouseEvent)
  },
  false
)
canvas.addEventListener(
  'touchend',
  function (e) {
    var mouseEvent = new MouseEvent('mouseup', {})
    canvas.dispatchEvent(mouseEvent)
  },
  false
)
canvas.addEventListener(
  'touchmove',
  function (e) {
    var touch = e.touches[0]
    var mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
    canvas.dispatchEvent(mouseEvent)
  },
  false
)

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect()
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  }
}

// Prevent scrolling when touching the canvas
document.body.addEventListener(
  'touchstart',
  function (e) {
    if (e.target == canvas) {
      e.preventDefault()
    }
  },
  false
)
document.body.addEventListener(
  'touchend',
  function (e) {
    if (e.target == canvas) {
      e.preventDefault()
    }
  },
  false
)
document.body.addEventListener(
  'touchmove',
  function (e) {
    if (e.target == canvas) {
      e.preventDefault()
    }
  },
  false
)
