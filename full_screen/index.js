const enterFullscreenBtn = document.querySelector('.enterFullscreenBtn')
const exitFullscreenBtn = document.querySelector('.exitFullscreenBtn')
const toggleFullscreenBtn = document.querySelector('.toggleFullscreenBtn')

const container = document.querySelector('.container')

enterFullscreenBtn.addEventListener('click', e => {
  fullscreen(container)
})

exitFullscreenBtn.addEventListener('click', e => {
  exitFullScreen()
})

toggleFullscreenBtn.addEventListener('click', e => {
  toggleFullScreen(container)
})

const fullscreen = element => {
  if (element.requestFullscreen) return element.requestFullscreen()
  if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
  if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
  if (element.msRequestFullscreen) return element.msRequestFullscreen()
}

const exitFullScreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen()
  if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen()
  if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
  if (document.msExitFullscreen) return document.msExitFullscreen()
}

function toggleFullScreen(element) {
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) return element.requestFullscreen()
    if (element.webkitRequestFullscreen)
      return element.webkitRequestFullscreen()
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
    if (element.msRequestFullscreen) return element.msRequestFullscreen()
  } else {
    if (document.exitFullscreen) return document.exitFullscreen()
    if (document.webkitCancelFullscreen)
      return document.webkitCancelFullscreen()
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
    if (document.msExitFullscreen) return document.msExitFullscreen()
  }
}