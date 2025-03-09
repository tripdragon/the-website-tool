import { useState } from 'react'

import './App.css'
import './styles/tools.scss'

import SourceBox from './comps/SourceBox/SourceBox';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div id="tools">
      <SourceBox targetId="site" />
    </div>

    <div id="site">

      <h2 contentEditable="true">Fiiiish</h2>

    </div>

    </>
  )
}

export default App
