'use client'
import { useRef, useState } from 'react'
import Question from '@/_components/Question'
import Answer from '@/_components/Answer'

const courseData = [
  {
    name: '第一节课',
    statements: [
      {
        chinese: '现在',
        english: 'now',
        soundmark: '/naʊ/'
      }
    ]
  }
]
const failedCountTotal = 3

const Main = () => {
  // 问题  回答
  const [currentState, setCurrentState] = useState<'question' | 'answer'>('question')
  const failedCount = useRef(0)
  const currentCourse = courseData[0]
  const { chinese, english, soundmark } = currentCourse.statements[0]
  const questionWord = chinese
  const answerWord = english
  const answerSoundMark = soundmark

  function checkCorrect(input: string) {
    return input == answerWord
  }

  const handleCheckAnswer = (userInput: string) => {
    if (checkCorrect(userInput)) {
      setCurrentState('answer')
    } else {
      failedCount.current++
      if (failedCount.current >= failedCountTotal) {
        setCurrentState('answer')
        failedCount.current = 0
      }
    }
  }

  return (
    <div>{currentState === 'question' ? <Question questionWord={questionWord} onCheckAnswer={handleCheckAnswer} /> : <Answer word={answerWord} soundmark={answerSoundMark} />}</div>
  )
}

export default Main
