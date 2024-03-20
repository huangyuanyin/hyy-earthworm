const Answer = ({ word, soundmark }: { word: string; soundmark: string }) => {
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
      <button>next</button>
    </div>
  )
}

export default Answer
