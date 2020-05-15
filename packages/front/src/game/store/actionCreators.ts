import {
  SET_CURRENT_ROOM,
  SET_ROOM_PLAYERS,
  ADD_PLAYER_TO_ROOM,
  SET_PLAYER_NAME,
  SET_PLAYER_ID,
  SET_ROOM_STATUS,
  RESET,
  SET_DEFINITION,
  MOVE
} from './actionNames'
import { IPlayer } from '@p/types/Player'
import { IRoom, RoomStatus } from '@p/types/Room'
import { IMove } from '@p/types/Move'
import { ReaderTurnPayload } from '@p/types/communication/ServerMessage'

export const setCurrentRoom = (room: IRoom) => ({
  type: SET_CURRENT_ROOM,
  payload: {
    room
  }
})

export const setRoomPlayers = (players: IPlayer[]) => ({
  type: SET_ROOM_PLAYERS,
  payload: {
    players
  }
})

export const addPlayerToRoom = (player: IPlayer) => ({
  type: ADD_PLAYER_TO_ROOM,
  payload: {
    player
  }
})

export const setPlayerName = (name: string) => ({
  type: SET_PLAYER_NAME,
  payload: {
    name
  }
})

export const setPlayerId = (id: string) => ({
  type: SET_PLAYER_ID,
  payload: {
    id
  }
})

export const setRoomStatus = (newStatus: RoomStatus) => ({
  type: SET_ROOM_STATUS,
  payload: {
    newStatus
  }
})

export const doMove = (move: IMove) => ({
  type: MOVE,
  payload: move
})

export const reset = () => ({
  type: RESET,
  payload: {}
})

export const setDefinition = (payload: ReaderTurnPayload) => ({
  type: SET_DEFINITION,
  payload
})
