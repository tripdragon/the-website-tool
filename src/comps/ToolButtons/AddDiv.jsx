
// import { useState, useEffect } from "react";


// export default function AddDivButton({ target }) {

// 	const add = () => {
// 		target.append('div .magic')
// 	}

// 	return <button id="" onClick={add} >+</button>
// }



import { useState, useEffect, forwardRef, useImperativeHandle } from "react";


import { useSelectorStore } from "@stores/selectorStore.js";




export default function AddDivButton() {

  const selectedElement = useSelectorStore((state) => state.selectedElement);  

  // const add = () => {
  //   const newDiv = document.createElement('div');
  //   newDiv.classList.add('magic');
  //   getSelectedElement.selectedElement.appendChild(newDiv);
  // };

  const add = () => {

    if (selectedElement) {

      const newDiv = document.createElement('div');
      newDiv.classList.add('new-box');
      newDiv.setAttribute('contenteditable', 'true');
      const uniqueId = `box-${Math.random().toString(36).substr(2, 9)}`;
      newDiv.setAttribute('id', uniqueId);
      selectedElement.appendChild(newDiv);


      // update the style sheet
      const styleElement = document.getElementById("inlinestylesheet");
      const styleSheet = [...document.styleSheets].find(sheet => sheet.ownerNode === styleElement);

      if (styleSheet) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        
        styleSheet.insertRule(`#${uniqueId} { border:solid 1px ${randomColor} }`, styleSheet.cssRules.length);

        // Update the text content of the <style> element to reflect the changes
        styleElement.textContent = [...styleSheet.cssRules].map(rule => rule.cssText).join("\n");
      }

    }
  };

  return <button className="add-button" onClick={add}>+</button>;
}
