
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
      selectedElement.appendChild(newDiv);  // Append new div to the selected element
    }
  };

  return <button className="add-button" onClick={add}>+</button>;
}
