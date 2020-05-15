import GameManager from '../../GameManager'
import * as Payload from '@p/types/communication/ServerMessage'
import {
  setCurrentRoom,
  addPlayerToRoom,
  setPlayerId,
  setRoomStatus,
  doMove,
  setDefinition
} from '../../../store'
import { RoomStatus } from '@p/types/Room'
import { MoveType } from '@p/types/Move'

export function roomCreated(payload: Payload.RoomCreatedPayload) {
  const game = GameManager.getGame()
  game.dispatch(setCurrentRoom(payload.room))
  game.dispatch(setPlayerId(payload.playerId))
}

export function roomJoined(payload: Payload.RoomJoinedPayload) {
  const game = GameManager.getGame()
  game.dispatch(setPlayerId(payload.playerId))
  game.dispatch(setCurrentRoom(payload.room))
}

export function playerJoined(payload: Payload.PlayerJoinedPayload) {
  const game = GameManager.getGame()
  console.log(payload.player.name, 'has joined')
  game.dispatch(addPlayerToRoom(payload.player))
}

export function roomStarted(payload: Payload.RoomStartedPayload) {
  const game = GameManager.getGame()
  console.log('Starting room!')
  game.dispatch(setRoomStatus(RoomStatus.Started))
}

export function move(payload: Payload.MovePayload) {
  const game = GameManager.getGame()
  console.log('Got move:', MoveType[payload.type])
  game.dispatch(doMove(payload))
}

export function readerTurn(payload: Payload.ReaderTurnPayload) {
  const game = GameManager.getGame()
  console.log('Got definition:', payload)
  game.dispatch(setDefinition(payload))
}
