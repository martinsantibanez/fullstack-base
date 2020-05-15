import { Reducer } from 'redux'
import { ActionValues, Action } from '.'
import {
  SET_CURRENT_ROOM,
  ADD_PLAYER_TO_ROOM,
  SET_ROOM_PLAYERS,
  SET_PLAYER_NAME,
  SET_PLAYER_ID,
  SET_ROOM_STATUS,
  RESET,
  MOVE,
  SET_DEFINITION
} from './actionNames'
import { IRoom } from '@p/types/Room'
import { IWord } from '@p/types/Word'

export enum TurnType {
  Player,
  Reader
}

export type State = {
  playerId: string
  playerName: string
  requestedRoom?: string
  currentRoom?: IRoom
  wordToRead?: IWord
}
const initialState: State = {
  playerId: '',
  playerName: '',
  requestedRoom: undefined,
  currentRoom: undefined,
  wordToRead: undefined
}
export const reducer: Reducer<State, ActionValues> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ROOM:
      return handleSetCurrentRoom(state, action.payload)
    case SET_ROOM_PLAYERS:
      return handleSetRoomPlayers(state, action.payload)
    case ADD_PLAYER_TO_ROOM:
      return handleAddPlayerToRoom(state, action.payload)
    case SET_PLAYER_NAME:
      return handleSetPlayerName(state, action.payload)
    case SET_PLAYER_ID:
      return handleSetPlayerId(state, action.payload)
    case SET_ROOM_STATUS:
      return handleSetRoomStatus(state, action.payload)
    case MOVE:
      return handleMove(state, action.payload)
    case SET_DEFINITION:
      return handleSetDefinition(state, action.payload)
    case RESET:
      return handleReset(state, action.payload)
    default:
      return state
  }
}

function handleSetCurrentRoom(state: State, payload: Action['setCurrentRoom']['payload']): State {
  return {
    ...state,
    currentRoom: payload.room
  }
}

function handleSetRoomPlayers(state: State, payload: Action['setRoomPlayers']['payload']): State {
  if (!state.currentRoom) return state
  return {
    ...state,
    currentRoom: {
      ...state.currentRoom,
      players: [...payload.players]
    }
  }
}

function handleAddPlayerToRoom(state: State, payload: Action['addPlayerToRoom']['payload']): State {
  if (!state.currentRoom) return state
  return {
    ...state,
    currentRoom: {
      ...state.currentRoom,
      players: [...state.currentRoom?.players, payload.player]
    }
  }
}
function handleSetPlayerName(state: State, payload: Action['setPlayerName']['payload']): State {
  return {
    ...state,
    playerName: payload.name
  }
}

function handleSetPlayerId(state: State, payload: Action['setPlayerId']['payload']): State {
  return {
    ...state,
    playerId: payload.id
  }
}

function handleSetRoomStatus(state: State, payload: Action['setRoomStatus']['payload']): State {
  if (!state.currentRoom) return state
  return {
    ...state,
    currentRoom: {
      ...state.currentRoom,
      status: payload.newStatus
    }
  }
}

function handleMove(state: State, payload: Action['doMove']['payload']): State {
  if (!state.currentRoom) return state
  return {
    ...state,
    currentRoom: {
      ...state.currentRoom,
      turnStatus: payload.newTurnStatus,
      currentTurnId: payload.currentTurnId,
      players: state.currentRoom.players.map((p) => {
        if (p.id !== payload.currentTurnId) return p
        return {
          ...p,
          currentLetter: payload.currentLetter,
          letters: p.letters.map((l, i) => {
            if (i !== payload.letterToUpdate) return l
            return {
              ...l,
              status: payload.newLetterStatus
            }
          })
        }
      })
    }
  }
}
function handleReset(state: State, payload: any): State {
  return {
    ...initialState
  }
}
function handleSetDefinition(state: State, payload: Action['setDefinition']['payload']): State {
  return {
    ...state,
    wordToRead: payload
  }
}
