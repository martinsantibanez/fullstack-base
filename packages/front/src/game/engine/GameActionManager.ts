import CommunicationManager from './communication/CommunicationManager'
import {
  CREATE_ROOM,
  JOIN_ROOM,
  REQUEST_START_ROOM,
  REQUEST_START_TIME,
  REQUEST_MOVE
} from '@p/types/communication/ClientMessageName'
import { CreateRoomPayload, JoinRoomPayload, RequestMovePayload } from '@p/types/communication/ClientMessage'

export default class GameActionManager {
  req: CommunicationManager
  constructor(requestManager: CommunicationManager) {
    this.req = requestManager
  }
  createRoom(payload: CreateRoomPayload) {
    this.req.sendMessage(CREATE_ROOM, payload)
  }
  joinRoom(payload: JoinRoomPayload) {
    this.req.sendMessage(JOIN_ROOM, payload)
  }
  startRoom() {
    this.req.sendMessage(REQUEST_START_ROOM)
  }
  startTime() {
    this.req.sendMessage(REQUEST_START_TIME)
  }
  move(payload: RequestMovePayload) {
    //GameManager.getGame().dispatch(doMove({}))
    this.req.sendMessage(REQUEST_MOVE, payload)
  }
}
