import { createSelector } from 'reselect'
import { State } from '.'
import { TurnType } from './reducer'
export const getCurrentRoom = (state: State) => state.currentRoom
export const getPlayerId = (state: State) => state.playerId
export const getPlayerName = (state: State) => state.playerName
export const getPlayers = (state: State) => state.currentRoom?.players
export const getPlayer = createSelector([getPlayerId, getPlayers], (pId, players) => {
  return players?.find((p) => p.id === pId)
})
export const getIsHost = createSelector([getCurrentRoom, getPlayer], (r, p) => r?.hostId === p?.id)
export const getCurrentTurn = (state: State) => state.currentRoom?.currentTurnId
export const getPlaying = createSelector([getCurrentTurn, getPlayers], (turn, players) => {
  return players?.find((p) => p.id === turn)
})
export const getTurnType = createSelector([getCurrentTurn, getPlayerId], (turn, pId) => {
  if (turn === pId) return TurnType.Player
  else return TurnType.Reader
})

export const getTurnStatus = createSelector([getCurrentRoom], (r) => r?.turnStatus)

export const getCurrentLetters = createSelector([getPlaying], (playing) => {
  return playing?.letters
})

export const getCurrentLetter = createSelector([getPlaying], (playing) => {
  return playing?.currentLetter
})

export const getWordToRead = (state: State) => state.wordToRead
