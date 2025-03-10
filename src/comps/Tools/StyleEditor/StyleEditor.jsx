import { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import './styleEditor.scss';

import { useSelectorStore } from "@stores/selectorStore.js";


// const StyleEditor = forwardRef(({ targetId }, ref) => {
const StyleEditor = forwardRef((_, ref) => {
  const [sourceCode, setSourceCode] = useState('');
  const [revealed, setRevealed] = useState(false);
  
  const [styleObject, setStyleObject] = useState({});

  const { isStyleEditorActive, selectedElement } = useSelectorStore();


  const cssRuleToObject = (cssRule) => {
    const obj = {};
    const clean = cssRule.replace(/\n/g, "").trim();

    const match = clean.match(/(.*?)\s*\{(.*?)\}/);

    if (match) {
      const selector = match[1].trim(); // Get the selector (e.g., "#box-4fl03zcpt")
      const properties = match[2].trim().split(";").filter(p => p);

      properties.forEach(prop => {
        const [key, value] = prop.split(":").map(str => str.trim());
        obj[key] = value;
      });

      return { selector, styles: obj };
    }
    return null;
  }



  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    toggle: () => {
      setRevealed((prev) => !prev);
      console.log("StyleEditor visibility toggled");
      setSourceCode(Math.random())
      refresh();
    },
    // refreshSourceCode: () => {
    //   updateSourceCode();
    // }
  }));



  const formatAndFeedInput = () => {
    const styleSheet = [...document.styleSheets].find(sheet =>
      sheet.ownerNode.id === "inlinestylesheet"
    );
    if (styleSheet) {
      const rule = [...styleSheet.cssRules].find(r => r.selectorText === `#${selectedElement.id}`);
      if(rule){
        console.log(rule.style.cssText); // Outputs: "border: solid 14px green;"
        const id = selectedElement?.id;

        // this builds the sting as a standard css rule
        const bb = `#${id} { \n ${rule.style.cssText} \n }`;
        setSourceCode(bb);
        const yy = cssRuleToObject(bb);
        setStyleObject(yy);
      }
      else if (selectedElement){

        const bb = `#${selectedElement?.id} { }`;
        setSourceCode(bb);
      }
    }
    else {
      setSourceCode('_');
    }
  }


  const refresh = () => {
    if(selectedElement){

      formatAndFeedInput();

      // const styleSheet = [...document.styleSheets].find(sheet =>
      //   sheet.ownerNode.id === "inlinestylesheet"
      // );

      // if (styleSheet) {
        

      //   if (rule) {
          
          // // const stringStyle = `#${id} { ${rule.style.cssText} }`;
          // const stringStyle = `#${id} { ${rule.style.cssText} color:green; }`;
          // const cssObject = cssRuleToObject(stringStyle);
          // setStyleObject(cssObject);
          // console.log("cssObject", cssObject);
          // console.log("stringStyle", stringStyle);
          // // debugger







      //   }
      //   else {
      //     setSourceCode('_');
      //   }
      // }

      // const id = selectedElement.id;
      // setSourceCode(`id: ${id}`)
    }
  }



  // Function to run when selectedElement changes
  const handleSelectedElementChange = (element) => {
    if (element) {
      // Run your logic when selectedElement changes
      console.log('Selected Element:', element);
      // Example: Set sourceCode based on selectedElement
      // setSourceCode(`Code for ${element}`);
      refresh();
    }
  };

 // useEffect to detect changes in selectedElement and run the function
  useEffect(() => {
    if (selectedElement) {
      handleSelectedElementChange(selectedElement);
    }
  }, [selectedElement]);



  // Function to prettify the HTML without <body> and unwanted xmlns attributes
  // const prettifyHTML = (html) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, "text/html");
  //   return doc.body.innerHTML.replace(/></g, ">\n<"); // Adds line breaks
  // };


  const handleSourceCodeChange = (e) => {
    const updatedCode = e.target.value;
    setSourceCode(updatedCode);
    

    // have no idea if this will behave properly
    const yy = cssRuleToObject(updatedCode);
    setStyleObject(yy);

    console.log("yy", yy);
    sendToStyleSheet(yy);

  };


  const sendToStyleSheet = (cssObject) => {
    const styleSheet = [...document.styleSheets].find(sheet =>
      sheet.ownerNode.id === "inlinestylesheet"
    );
    if (styleSheet) {
      // // Now reassign styles to the stylesheet  
      // Update the existing rule with the new styles
      const ruleIndex = [...styleSheet.cssRules].findIndex(rule => rule.selectorText === cssObject.selector);
      if (ruleIndex !== -1) {
        const rule = styleSheet.cssRules[ruleIndex];
        
        Object.keys(cssObject.styles).forEach(property => {
          rule.style[property] = cssObject.styles[property];
        });
              // Optionally, update the style element's textContent to reflect changes
        const styleElement = document.getElementById("inlinestylesheet");
        if(styleElement){
          styleElement.textContent = [...styleSheet.cssRules].map(rule => rule.cssText).join("\n");
        }
      }
    }
  }


  // const updateSourceCode = () => {
  //   const element = document.getElementById(targetId);
  //   if (element) {
  //     // setSourceCode(prettifyHTML(element.innerHTML));
  //     setSourceCode(prettifyHTML(element.outerHTML));
  //   }
  // };

  return (
    <div id="styleeditor" style={{ display: revealed ? "block" : "none" }}>
      <textarea
        value={sourceCode}
        onChange={handleSourceCodeChange}
        rows={10}
        cols={50}
        style={{ fontFamily: "monospace", whiteSpace: "pre" }}
      />
    </div>
  );
});

export default StyleEditor;



/*

const cssString = '#gg { border: 12px solid rgb(90, 109, 190); color: green; }';
const cssObject = cssRuleToObject(cssString);

console.log(cssObject);

*/
