import { ChangeEvent, useState } from 'react'

const Question = ({
  word,
  onCheckAnswer,
}: {
  word: string
  onCheckAnswer: (userInput: string) => void
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCheckAnswer(inputValue)
    }
  }

  return (
    <div>
      {word}
      <input
        className="bg-red-500"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Question
