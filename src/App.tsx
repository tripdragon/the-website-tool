import { useState, useRef } from 'react'

import './App.css'
import './styles/tools.scss'

import ToolsShelf from './comps/ToolsShelf/ToolsShelf';

import Tools from '@tools/Tools';
import SourceBox from '@tools/SourceBox/SourceBox';
import SelectorTool from '@tools/SelectorTool/SelectorTool';

import ToggleSource from './comps/ToolButtons/ToggleSource';
import ToggleSelector from './comps/ToolButtons/ToggleSelector';

import UserSite from './comps/UserSite/UserSite';





function App() {
  const [count, setCount] = useState(0)

  const sourceBox = useRef();
  const selector = useRef();


  return (
    <>
      <ToolsShelf id="tools">
        <ToggleSource target={sourceBox} />
        <ToggleSelector target={selector} />
        
        <Tools>
          <SourceBox targetId="site" ref={sourceBox} />
        </Tools>

      </ToolsShelf>

      <Tools>
        <SelectorTool ref={selector} />
      </Tools>
        

{/*    <div id="tools">
      <SelectorTool />
      <SourceBox targetId="site" />
    </div>*/}

    <UserSite />

    </>
  )
}

export default App
