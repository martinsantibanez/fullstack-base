import React from 'react'
import { MoveType } from '@p/types/Move'
import './ActionButton.scss'

type Props = {
  title: string
  type: MoveType
  onClick: (type: MoveType) => any
}
export default function ActionButton({ title, type, onClick }: Props) {
  let typeClass = ''
  switch (type) {
    case MoveType.Correct:
      typeClass = 'correct'
      break
    case MoveType.Skip:
      typeClass = 'skip'
      break
    case MoveType.Wrong:
      typeClass = 'wrong'
      break
  }
  return (
    <button className={'action-button ' + typeClass} onClick={() => onClick(type)}>
      {title}
    </button>
  )
}
