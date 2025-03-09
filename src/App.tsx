import { useState } from 'react'

import './App.css'

import SourceBox from './comps/SourceBox/SourceBox';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SourceBox />
    </>
  )
}

export default App
