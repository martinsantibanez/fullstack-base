import React from 'react'
import { LetterStatus } from '@p/types/LetterGame'
type Props = {
  letter: string
  status: LetterStatus
  current: boolean
}
export default function Letter({ letter, status = LetterStatus.Pending, current = false }: Props) {
  let statusClass = ''
  switch (status) {
    case LetterStatus.Correct:
      statusClass = ' item--success'
      break
    case LetterStatus.Wrong:
      statusClass = ' item--failure'
      break
    case LetterStatus.Skipped:
      statusClass = ' item--skipped'
      break
  }
  if (current) statusClass += ' item--current'
  return (
    <li className={'item' + statusClass} key={letter}>
      {letter}
    </li>
  )
}
