'use client'
import { ChangeEvent, useState } from 'react'

const failedCountTotal = 3
let failedCount = 0

const Practice = () => {
  const chinese = '现在'
  const english = 'now'
  const answer = 'now'
  const soundmark = '/naʊ/'
  const [inputValue, setInputValue] = useState('')
  const [displayWork, setDisplayWork] = useState(chinese)
  // 问题  回答
  const [currentState, setCurrentState] = useState('question')
  const [displaySoundmark, setDisplaySoundmark] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (checkValidity(inputValue)) {
        handleAnswer()
      } else {
        console.log('失败')
        setInputValue('')
        failedCount++
        if (failedCount >= failedCountTotal) {
          handleAnswer()
          failedCount = 0
        }
      }
    }
  }

  function handleAnswer() {
    console.log('正确')
    setCurrentState('answer')
    setDisplayWork(english)
    setDisplaySoundmark(soundmark)
    console.log('发音')
    playSound()
  }

  function playSound() {}

  function checkValidity(input: string) {
    return input == answer
  }

  const AnswerView = (
    <>
      <div>
        <div>{displayWork}</div>
        <div>{displaySoundmark}</div>
        <div>
          <audio controls autoPlay>
            <source src="http://dict.youdao.com/dictvoice?type=0&audio=now" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </>
  )

  return (
    <div>
      <div>
        {currentState === 'question' ? <div>{displayWork}</div> : AnswerView}
        <div>
          <input className="bg-red-500" type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        </div>
      </div>
    </div>
  )
}

export default Practice
