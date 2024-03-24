import { describe, it, expect } from "vitest";
import { parse, parseEnglishAndSoundMark } from './parsePdf'

describe('parsePdf', () => {
  it('happy path', () => {
    const pdfText =
      '\n' +
      '你好，我是星荣。 \n' +
      '中文 英文 K.K.音标 \n' +
      '我 \n' +
      'I /aɪ/ \n' +
      "\n" +
      "3 \n" +
      '喜欢 \n' +
      'like /laɪk/ \n'

    expect(parse(pdfText)).toEqual([
      {
        chinese: '我',
        english: 'I',
        soundMark: '/aɪ/'
      }, {
        chinese: '喜欢',
        english: 'like',
        soundMark: '/laɪk/'
      }
    ])
  })

  it.only('complex', () => {
    const pdfText =
      ' \n' +
      '你好，我是星荣。 \n' +
      '中文 英文 K.K.音标 \n' +
      '我 \n' +
      'I /aɪ/ \n' +
      "\n" +
      '3 \n' +
      '我需要告诉你重要的某些事 \n' +
      'I need to tell you something important \n' +
      '/ai/ /nid/ /te/ \n' +
      '喜欢 \n' +
      'like /laɪk/ \n'

    expect(parse(pdfText)).toEqual([
      {
        chinese: '我',
        english: 'I',
        soundMark: '/aɪ/'
      },
      {
        chinese: '我需要告诉你重要的某些事',
        english: 'I need to tell you something important',
        soundMark: '/ai/ /nid/ /te/'
      },
      {
        chinese: '喜欢',
        english: 'like',
        soundMark: '/laɪk/'
      }
    ])
  })

  describe('parse English And SoundMark', () => {
    it('parse simply', () => {
      expect(parseEnglishAndSoundMark('like /laɪk/')).toEqual({
        english: 'like',
        soundMark: '/laɪk/'
      })
    })

    it('parse multi group', () => {
      expect(parseEnglishAndSoundMark('like me /laɪk/ /me/')).toEqual({
        english: 'like me',
        soundMark: '/laɪk/ /me/'
      })
    })
  })
})
