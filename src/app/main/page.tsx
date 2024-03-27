'use client'
import { useEffect, useRef, useState } from 'react'
import Question from '@/_components/Question'
import Answer from '@/_components/Answer'

const failedCountTotal = 3

const Main = () => {
  // 问题  回答
  const [currentMode, setCurrentMode] = useState<'question' | 'answer'>('question')
  const [questionWord, setQuestion] = useState('')
  const [answerWord, setAnswerWord] = useState('')
  const [answerSoundMark, setAnswerSoundMark] = useState('')
  const statementIndex = useRef(0)
  const failedCount = useRef(0)
  const currentCourse = useRef<any>({})

  function updateWord() {
    const { chinese, english, soundmark } = currentCourse.current.statements[statementIndex.current]
    setQuestion(chinese)
    setAnswerWord(english)
    setAnswerSoundMark(soundmark)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/course')
      const data = await response.json()
      currentCourse.current = data.data
      updateWord()
    }
    fetchData()
  }, [])

  function checkCorrect(input: string) {
    return input == answerWord
  }

  const handleToNextStatement = () => {
    statementIndex.current++
    setCurrentMode('question')
    updateWord()
  }

  const handleCheckAnswer = (userInput: string) => {
    if (checkCorrect(userInput)) {
      setCurrentMode('answer')
    } else {
      failedCount.current++
      if (failedCount.current >= failedCountTotal) {
        failedCount.current = 0
        setCurrentMode('answer')
      }
    }
  }

  return (
    <div>
      {currentMode === 'question' ? (
        <Question word={questionWord} onCheckAnswer={handleCheckAnswer} />
      ) : (
        <Answer
          word={answerWord}
          soundmark={answerSoundMark}
          onToNextStatement={handleToNextStatement}
        />
      )}
    </div>
  )
}

export default Main
