import React from 'react'
import Button from './components/Btn'
import { useSelector, getIsHost, getPlayerName, getPlayers, getPlayerId } from './store'
import GameManager from './engine/GameManager'
import './RoomLobby.scss'

export default function RoomLobby() {
  const playerId = useSelector(getPlayerId)
  const playerName = useSelector(getPlayerName)
  const players = useSelector(getPlayers)
  const opponent = players?.find((p) => p.id !== playerId)
  const isHost = useSelector(getIsHost)
  const startGame = () => {
    const game = GameManager.getGame()
    game.action.startRoom()
  }
  return (
    <div className="lobby-main">
      <div className="player-entry">{playerName}</div>
      {opponent ? (
        <>
          <div className="versus">VS</div>
          <div className="player-entry secondary">{opponent.name}</div>
        </>
      ) : (
        <div className="player-pending">
          <div className="label">Invita un oponente:</div>
          <input type="text" value={window.location.href} />
        </div>
      )}
      {/*<PlayerList />*/}
      {isHost && players?.length === 2 && (
        <div>
          <Button onClick={startGame}>¡Jugar!</Button>
        </div>
      )}
    </div>
  )
}
