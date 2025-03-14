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
import FontsPicker from '@tools/FontsPicker/FontsPicker';

import UserSite from './comps/UserSite/UserSite';


import {useSelectorStore} from '@stores/selectorStore';



function App() {
  const [count, setCount] = useState(0)

  const sourceBox = useRef();
  const selector = useRef();
  const styleEditor = useRef();

  const { isSelectorActive, selectedElement } = useSelectorStore();


  // glue code, belongs in buttons but oy is it a mess to get that to behave
  const handleRefreshClick = () => {
    // Call the exposed function to refresh the source code
    sourceBox.current.refreshSourceCode();
  };


  const fonts = [
    { label: "Fedro Light", value: "Fedro Light", url: "/the-website-tool/fonts/Fedro-Light.otf", format: "opentype" },
    { label: "Rawnster Script Regular", value: "Rawnster Script Regular", url: "/the-website-tool/fonts/Rawnster-Script.otf", format: "opentype" },
    { label: "YWFT Avant Modern ", value: "YWFT Avant Modern", url: "/the-website-tool/fonts/YWFT-Avant-Modern-Regular-Demo.otf", format: "opentype" },
  ];

  // const handleFontChange = (font) => {
  //   // document.body.style.fontFamily = font;
  //   if(selectedElement){
  //     selectedElement.style.fontFamily = font;
  //   }
  // };
  const handleFontChange = (font) => {
    if(selectedElement && selectedElement.id){
      // selectedElement.style.fontFamily = font;
      // const styleSheet = document.getElementById("inlinestylesheet");
      const styleSheet = [...document.styleSheets].find(sheet =>
        sheet.ownerNode.id === "inlinestylesheet"
      );
      if(styleSheet){
        let ruleFound = false;
        let index = -1;
          // debugger

        const ruleIndex = [...styleSheet.cssRules].findIndex(rule => rule.selectorText === `#${selectedElement.id}`);
        if (ruleIndex !== -1) {
          const rule = styleSheet.cssRules[ruleIndex];
          rule.style.fontFamily = font;
          const styleElement = document.getElementById("inlinestylesheet");
          if(styleElement){
            styleElement.textContent = [...styleSheet.cssRules].map(rule => rule.cssText).join("\n");
          }
        }

        // Loop through the stylesheet rules to find the target rule
        // for (let i = 0; i < styleSheet.sheet.cssRules.length; i++) {
        //   const rule = styleSheet.sheet.cssRules[i];
        //   if (rule.selectorText === selectedElement.id) {
        //     // If the rule exists, modify its font-family
        //     rule.style.fontFamily = font;
        //     ruleFound = true;
        //     index = i;
        //     break;
        //   }
        // }
        // If the rule doesn't exist, you can add it
        // if (ruleIndex === -1) {
        //   styleSheet.sheet.insertRule(`${selectedElement.id} { font-family: ${font}; }`, styleSheet.sheet.cssRules.length);
        // }
        // copy back into the style tag
        
      }
    }
  };

  return (
    <>
      <ToolsShelf id="tools" position={{x:10, y:200}}>
        <ToggleSource target={sourceBox} />
        <ToggleSelector target={selector} />
        <ToggleStyleEditor target={styleEditor} />
        
              <button onClick={handleRefreshClick}>Refresh Source Code</button>

        <AddDiv />

        <FontsPicker fonts={fonts} onChange={handleFontChange} />
        
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
