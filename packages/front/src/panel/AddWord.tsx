import React from 'react'
import { IWord, WordType } from '@p/types/Word'
import InputField from '../common/InputField'
import { Letter } from '@p/types/LetterGame'
type Props = {
  initialWord: string
  initialDefinition: string
  onAdd: (word: IWord) => any
}

export default function AddWord({ initialDefinition, initialWord, onAdd }: Props) {
  const [type, setType] = React.useState(WordType.StartsWith)
  const [letter, setLetterState] = React.useState<string>(initialWord[0].toUpperCase())
  const [definition, setDefinition] = React.useState(initialDefinition)
  const [word, setWord] = React.useState(initialWord)
  //const [info, setInfo] = React.useState('')
  const setLetter = (newValue: string) => setLetterState(newValue.toUpperCase())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.currentTarget
    switch (name) {
      case 'letter':
        if (word.includes(value)) setLetter(value)
        break
      case 'word':
        setWord(value)
        break
      case 'definition':
        setDefinition(value)
        break
    }
  }
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as WordType
    if (value === WordType.StartsWith) setLetter(word[0])
    setType(e.currentTarget.value as WordType)
  }
  const submit = () => {
    if (type === WordType.Contains) {
      if (letter.length !== 1 || !(letter in Letter)) return
    }
    onAdd({
      definition,
      word,
      type,
      letter
    })
  }
  return (
    <div className="add-word">
      <h3>Agregar {word}</h3>
      <InputField name="word" value={word} type="text" onChange={handleChange} />
      <InputField name="definition" value={definition} type="textarea" onChange={handleChange} />
      <div>
        <select onChange={handleTypeChange}>
          <option value={WordType.StartsWith}>Empieza con</option>
          <option value={WordType.Contains}>Contiene</option>
        </select>
      </div>
      {type === WordType.Contains && (
        <InputField label="Letra" name="letter" onChange={handleChange} type="text" value={letter} />
      )}
      <button onClick={submit}>Agregar</button>
    </div>
  )
}
