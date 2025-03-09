import { useState, useEffect } from 'react'

import './sourcebox.scss';

export default function SourceBox({ targetId }) {
    const [sourceCode, setSourceCode] = useState('');

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element) {

      setSourceCode(element.outerHTML);

      // Create a MutationObserver to monitor changes to the target element
      const observer = new MutationObserver(() => {
        if (element) {
          // Update the source code in the state whenever the element changes
          setSourceCode(element.outerHTML);
        }
      });
      // // Configure the observer to watch for changes in the child list, subtree, and attributes
      observer.observe(element, { childList: true, subtree: true, attributes: true });

 
      // Attach the input event listener
      element.addEventListener('input', handleInputChange);

      return () => {
        element.removeEventListener('input', handleInputChange);
      };


      
    }
  }, [targetId]);

  const handleInputChange = () => {
    setSourceCode(element.outerHTML);
  };


  const handleSourceCodeChange = (e) => {
        

    setSourceCode(e.target.value);
    const element = document.getElementById(targetId);
    if (element) {
      element.removeEventListener('input', handleInputChange);

      // Updating the DOM element with the new source code
      element.outerHTML = e.target.value;

      element.addEventListener('input', handleInputChange);

    }

  };

  const updateSourceCode = () => {
    const element = document.getElementById(targetId);
    if (element) {
      setSourceCode(element.outerHTML);
    }
  };

  return (
    <div id="sourcebox">
      <h3>Source Code of Element with ID: {targetId}</h3>
      <textarea
        value={sourceCode}
        onChange={handleSourceCodeChange}
        rows={10}
        cols={50}
      />
      <button onClick={updateSourceCode}>Update DOM</button>

    </div>
  )
}

