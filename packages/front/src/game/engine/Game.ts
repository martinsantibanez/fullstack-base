//import Room from './rooms/Room'
import CommunicationManager from './communication/CommunicationManager'
import * as ENV from '../../ENV'
import GameActionManager from './GameActionManager'
import { DispatchFn, GetStateFn } from '../store'

export default class Game {
  //currentRoom?: Room
  //engine: MainEngine
  requestManager: CommunicationManager
  isStarting: boolean
  action: GameActionManager
  dispatchFn?: DispatchFn
  getStateFn?: GetStateFn

  constructor() {
    /*this.engine = new MainEngine(
      this.gameLoop,
      this.onResize,
      this.onMouseMove,
      this.onTouchStart,
      this.onTouchMove,
      this.onMouseClick,
      this.onMouseDoubleClick
    )*/
    this.requestManager = new CommunicationManager()
    this.action = new GameActionManager(this.requestManager)
    this.isStarting = false
  }
  dispatch(...args: Parameters<DispatchFn>) {
    if (this.dispatchFn) this.dispatchFn(...args)
    else console.error('FATAL: No dispatchFn')
  }
  getState(...args: Parameters<GetStateFn>) {
    if (this.dispatchFn) this.getState(...args)
    else console.error('FATAL: No getStateFn')
  }
  select(selector: any) {
    selector()
  }
  loadGame(dispatchFn: DispatchFn, getStateFn: GetStateFn): Promise<void> {
    this.dispatchFn = dispatchFn
    this.getStateFn = getStateFn
    this.isStarting = true
    console.log('Load game: Connect to server')
    return this.requestManager.connect(ENV.HOST, ENV.PORT, ENV.SSL_ENABLED)
  }

  onMouseMove = (x: number, y: number, isMouseDragging: boolean) => {}

  onTouchStart = (x: number, y: number) => {}

  onTouchMove = (x: number, y: number) => {}

  onMouseClick = (x: number, y: number, shiftKey: boolean, ctrlKey: boolean, altKey: boolean) => {}

  onMouseDoubleClick = (x: number, y: number) => {}

  onResize = () => {}

  gameLoop = (delta: number) => {}

  stop() {
    console.log('Stopping game...')
  }
}
