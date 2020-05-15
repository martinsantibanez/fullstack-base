import React, { useState } from 'react'
import axios from 'axios'
import AddWord from './AddWord'
import { IWord } from '@p/types/Word'
import './SearchRae.css'
import InputField from '../common/InputField'

const BACKEND = 'http://192.168.0.19:3020'

export default function SearchRae() {
  const [word, setWord] = useState('')
  const [selectedWord, setSelectedWord] = useState('')
  const [selectedDefinitionId, setSelectedDefinitionId] = useState(-1)
  const [words, setWords] = useState<string[]>([])
  const [definitions, setDefinitions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const searchRae = async (word: string) => {
    const response = await axios.get(`${BACKEND}/rae/search/${word}`)
    return response.data as string[]
  }

  const getDefinition = async (word: string) => {
    const response = await axios.get(`${BACKEND}/rae/definition/${word}`)
    console.log(response.data)
    return response.data
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.currentTarget.value)
    setLoading(true)
    setSelectedDefinitionId(-1)
    const words = await searchRae(event.currentTarget.value)
    setWords(words)
    setLoading(false)
  }

  const handleClick = async (word: string) => {
    setLoading(true)
    setSelectedWord(word)
    setDefinitions(await getDefinition(word))
    setLoading(false)
  }

  const selectDefinition = (index: number) => {
    setSelectedDefinitionId(index)
  }
  const addWord = async (word: IWord) => {
    setLoading(true)
    await axios.post(`${BACKEND}/word`, word)
    setLoading(false)
  }

  return (
    <div className="search-rae">
      <div className="search">
        {loading && <p>Cargando...</p>}
        <InputField type="text" name="word" onChange={handleChange} value={word} label="Ingrese palabra a buscar" />
        <ul>
          {words.map((word) => (
            <li className={'word ' + (word === selectedWord ? 'selected' : '')} onClick={() => handleClick(word)}>
              {word}
            </li>
          ))}
        </ul>
      </div>
      <div className="results">
        {!loading ? (
          <div>
            {selectedWord && <h3>Definiciones para {selectedWord}</h3>}
            {definitions.map((definition, i) => (
              <div
                key={i}
                className={'rae-definition' + (selectedDefinitionId === i ? ' selected' : '')}
                onClick={() => selectDefinition(i)}
              >
                {definition}
              </div>
            ))}
            {selectedDefinitionId >= 0 && (
              <AddWord
                initialDefinition={definitions[selectedDefinitionId]}
                initialWord={selectedWord}
                onAdd={addWord}
              />
            )}
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </div>
  )
}
