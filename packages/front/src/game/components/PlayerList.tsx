import React from 'react'
import { useSelector, getPlayers, getCurrentTurn, getPlayer } from '../store'

export default function PlayerList() {
  const player = useSelector(getPlayer)
  const players = useSelector(getPlayers)
  const currentTurn = useSelector(getCurrentTurn)
  if (!players || !player) return null
  return (
    <div>
      {players.map((p) => (
        <div key={p.id}>
          {p.name}
          {currentTurn === p.id && <b>[Jugando]</b>}
        </div>
      ))}
    </div>
  )
}
