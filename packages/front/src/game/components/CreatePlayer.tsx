import React, { useState } from 'react'
import InputField from '../../common/InputField'
import Btn from './Btn'
import ActionButton from './ActionButton'
import { MoveType } from '@p/types/Move'
import Definition from './Definition'
import { WordType } from '@p/types/Word'

type Props = {
  onSubmit: (playerName: string) => any
  buttonLabel?: string
  inputLabel?: string
}

export default function CreatePlayer({
  onSubmit,
  inputLabel = 'Introduce un nombre de usuario',
  buttonLabel = 'Continuar'
}: Props) {
  const [playerName, setPlayerName] = useState('')
  const [playerNameValid, setPlayerNameValid] = useState<boolean>()
  const handleClick = () => {
    if (!playerName.length) setPlayerNameValid(false)
    else onSubmit(playerName)
  }
  const handleChange = (e: any) => {
    setPlayerName(e.target.value)
    setPlayerNameValid(undefined)
  }
  return (
    <div className="create-player">
      <InputField
        type="text"
        name={'playerName'}
        label={inputLabel}
        onChange={handleChange}
        value={playerName}
        isValid={playerNameValid}
      />
      <Btn onClick={handleClick}>{buttonLabel}</Btn>
    </div>
  )
}
