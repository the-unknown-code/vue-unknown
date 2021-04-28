import mitt from 'mitt'

const emitter = mitt()

export default {
  $on: (...args) => emitter.on(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
  $clear: () => emitter.all.clear()
}

export const Events = {
  CLICK: 'click',
  RESIZE: 'resize'
}
