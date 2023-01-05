import { Inter } from '@next/font/google'
import TeamGenerator from '../src/features/TeamGenerator'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <TeamGenerator />
}
