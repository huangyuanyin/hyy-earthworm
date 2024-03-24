const fs = require('fs')
const pdf = require('pdf-parse')

function main() {
  let dataBuffer = fs.readFileSync('./01.pdf')
  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text)
    console.log(result)

    fs.writeFileSync('./01.json', JSON.stringify(result))
  })
}

main()

const STARTSIGN = '中文 英文 K.K.音标'
function parse(text) {
  // 0. 先基于 \n 来切分成数组
  const rawTextList = text.split("\n").map((t) => {
    return t.trim()
  })

  // 1. 先获取到开始的点
  const startIndex = rawTextList.findIndex((t) => t === STARTSIGN)

  // 2. 过滤掉没有用的数据
  //    1. 空的
  //    2. 只有number的(这个是换页符)
  const textList = rawTextList.splice(startIndex + 1).filter((t) => t && !/\d/.test(Number(t)))

  // 对齐格式
  // 如果当前是英文的话  那么检测下一行是不是英文，如果不是中文的话，那么就需要把这行的内容合并到当前行，并且删除掉这一个元素

  // 3. 成组 2个为一组（中文 / 英文+音标）
  const result = []
  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: '',
      english: '',
      soundMark: ''
    }

    function run() {
      const element = textList[i]
      let chinese = ''
      let englishAndSoundMark = ''

      if (isChinese(element)) {
        chinese += element
        while (isChinese(textList[i + 1])) {
          chinese += element
          i++
        }
        data.chinese = chinese
      } else {
        englishAndSoundMark += element
        while (textList[i + 1] && !isChinese(textList[i + 1])) {
          englishAndSoundMark += element
          i++
        }
        const { english, soundMark } = parseEnglishAndSoundMark(englishAndSoundMark)
        // console.log(parseEnglishAndSoundMark(englishAndSoundMark))
        data.english = english
        data.soundMark = soundMark
      }
    }
    run()
    i++
    run()

    result.push(data)
  }
  return result
}

function isChinese(str) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}

// 解析 英文+音标 =》遇到空白符去切 遇到"/"就说明是音标
function parseEnglishAndSoundMark(text) {
  // console.log(text)
  const list = text.split(' ')
  const soundMarkStartIndex = list.findIndex((t) => t.startsWith('/'))
  const english = list.slice(0, soundMarkStartIndex).join(' ')
  const soundMark = list.slice(soundMarkStartIndex).join(' ')
  return {
    english,
    soundMark
  }
}