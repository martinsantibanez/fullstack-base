import React from 'react'
import './Rosco.css'
import Letter from './components/Letter'
import { getCurrentLetters, useSelector, getCurrentLetter, getTurnStatus } from './store'
import { TurnStatus } from '@p/types/Move'

export default function Rosco() {
  const currentLetters = useSelector(getCurrentLetters)
  const currentLetter = useSelector(getCurrentLetter)
  const turnStatus = useSelector(getTurnStatus)
  if (!currentLetters || currentLetter === undefined || turnStatus === undefined) return null
  return (
    <div className="circle-container">
      <ul className="circle">
        {currentLetters.map((L, i) => (
          <Letter
            key={L.char}
            letter={L.char}
            status={L.status}
            current={i === currentLetter && turnStatus !== TurnStatus.TurnEnded}
          />
        ))}
      </ul>
    </div>
  )
}
