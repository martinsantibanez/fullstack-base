import React from 'react'
import { TurnType, getTurnType, getTurnStatus } from '../store'
import ActionButton from './ActionButton'
import { MoveType, TurnStatus } from '@p/types/Move'
import { useSelector } from 'react-redux'
import GameManager from '../engine/GameManager'
import './ActionContainer.scss'

type Props = {}

export default function ActionContainer() {
  const turnType = useSelector(getTurnType)
  const turnStatus = useSelector(getTurnStatus)
  let buttons: JSX.Element[] = [<></>]
  const handleAction = (type: MoveType) => {
    console.log('MOVE: ', type)
    GameManager.getGame().action.move({
      type
    })
  }
  if (turnType === TurnType.Player) {
    switch (turnStatus) {
      case TurnStatus.Playing:
        buttons = [<ActionButton title="Pasapalibre" type={MoveType.Skip} onClick={handleAction} />]
        break
      case TurnStatus.TurnEnded:
        buttons = [<div>Esperando al oponente</div>]
        break
      case TurnStatus.Waiting:
        buttons = [<div>Esperando al oponente</div>]
        break
    }
  } else {
    switch (turnStatus) {
      case TurnStatus.Playing:
        buttons = [
          <ActionButton title="Incorrecto" type={MoveType.Wrong} onClick={handleAction} />,
          <ActionButton title="Correcto" type={MoveType.Correct} onClick={handleAction} />
        ]
        break

      case TurnStatus.TurnEnded:
        buttons = [<ActionButton title="Listo" type={MoveType.NextTurn} onClick={handleAction} />]
        break
      case TurnStatus.Waiting:
        buttons = [<ActionButton title="Empezar tiempo" type={MoveType.StartTimer} onClick={handleAction} />]
        break
    }
  }
  return <div className="action-container">{buttons}</div>
}
