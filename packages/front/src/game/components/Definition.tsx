import React from 'react'
import { IWord, WordType } from '@p/types/Word'
import './Definition.scss'

type Props = {
  word: IWord
}

export default function ({ word }: Props) {
  const wordType = word.type === WordType.StartsWith ? 'Empieza con' : 'Contiene'
  return (
    <div className="definition">
      <div className="definition-read">
        <div className="letter">
          <div className="letter-type">{wordType}</div>
          <div className="letter-character">{word.letter}</div>
        </div>
        <div className="content">{word.definition}</div>
      </div>
      <div className="definition-word">
        <div className="label">RESPUESTA:</div>
        <div className="content">{word.word}</div>
      </div>
    </div>
  )
}
