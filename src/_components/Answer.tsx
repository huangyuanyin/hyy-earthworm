const Answer = ({
  word,
  soundmark,
  onToNextStatement,
}: {
  word: string
  soundmark: string
  onToNextStatement: () => void
}) => {
  const audioSrc = `http://dict.youdao.com/dictvoice?type=0&audio=${word}`

  return (
    <div>
      <div>
        {word}
        {soundmark}
      </div>
      <audio controls autoPlay>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
      <button onClick={() => onToNextStatement()}>next</button>
    </div>
  )
}

export default Answer
