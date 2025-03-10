import { useState, useRef } from 'react'

import './App.css'
import './styles/tools.scss'

import ToolsShelf from './comps/ToolsShelf/ToolsShelf';

import Tools from '@tools/Tools';
import SourceBox from '@tools/SourceBox/SourceBox';
import SelectorTool from '@tools/SelectorTool/SelectorTool';
import StyleEditor from '@tools/StyleEditor/StyleEditor';

import ToggleSource from './comps/ToolButtons/ToggleSource';
import ToggleSelector from './comps/ToolButtons/ToggleSelector';
import ToggleStyleEditor from './comps/ToolButtons/ToggleStyleEditor';
import AddDiv from './comps/ToolButtons/AddDiv';

import UserSite from './comps/UserSite/UserSite';

import {useSelectorStore} from '@stores/selectorStore';





function App() {
  const [count, setCount] = useState(0)

  const sourceBox = useRef();
  const selector = useRef();
  const styleEditor = useRef();

  const { isSelectorActive } = useSelectorStore();


  // glue code, belongs in buttons but oy is it a mess to get that to behave
  const handleRefreshClick = () => {
    // Call the exposed function to refresh the source code
    sourceBox.current.refreshSourceCode();
  };




  return (
    <>
      <ToolsShelf id="tools" position={{x:10, y:200}}>
        <ToggleSource target={sourceBox} />
        <ToggleSelector target={selector} />
        <ToggleStyleEditor target={styleEditor} />
        
              <button onClick={handleRefreshClick}>Refresh Source Code</button>

        <AddDiv />
        
        <Tools>
          <SourceBox targetId="site" ref={sourceBox} />
          <StyleEditor ref={styleEditor} />
        </Tools>

      </ToolsShelf>

      <Tools>
        <SelectorTool ref={selector} />
        {/*{isSelectorActive && <Selector ref={selector} />}*/}

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
