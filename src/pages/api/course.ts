import { NextApiRequest, NextApiResponse } from 'next'
import courseData from './01.json'

export default function GRT(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    name: '第一节课',
    statements: courseData,
  }
  res.status(200).json({ state: 200, data })
}
