import React, { useEffect } from 'react'
import GameManager from './engine/GameManager'
import CreatePlayer from './components/CreatePlayer'
import { useHistory } from 'react-router-dom'
import { useSelector, getCurrentRoom, setPlayerName } from './store'
import { useDispatch } from 'react-redux'

export default function CreateRoom() {
  const history = useHistory()
  const game = GameManager.getGame()
  const dispatch = useDispatch()
  const handleCreate = (playerName: string) => {
    dispatch(setPlayerName(playerName))
    game.action.createRoom({ playerName })
  }
  const currentRoom = useSelector(getCurrentRoom)
  useEffect(() => {
    if (currentRoom) {
      history.push(`/game/room/${currentRoom.id}`)
    }
  }, [currentRoom, history])
  return (
    <div>
      <CreatePlayer onSubmit={handleCreate} buttonLabel={'Jugar'} />
    </div>
  )
}
