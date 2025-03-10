import { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import './sourcebox.scss';

const SourceBox = forwardRef(({ targetId }, ref) => {
  const [sourceCode, setSourceCode] = useState('');
  const [revealed, setRevealed] = useState(false);

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    toggle: () => {
      setRevealed((prev) => !prev);
      console.log("SourceBox visibility toggled");
    },
    // called externally
    refreshSourceCode: () => {
      updateSourceCode();
    }
  }));

  // Function to prettify the HTML without <body> and unwanted xmlns attributes
  const prettifyHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.innerHTML.replace(/></g, ">\n<"); // Adds line breaks
  };

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element) {
      // Set the initial formatted source code

      // note its outer here to get the initial full wrapper
      // hmmmm
      // setSourceCode(prettifyHTML(element.innerHTML));
      setSourceCode(prettifyHTML(element.outerHTML));

      // Event listener for content changes
      const handleInputChange = () => {
        // setSourceCode(prettifyHTML(element.innerHTML)); // Pretty print updated HTML
        setSourceCode(prettifyHTML(element.outerHTML)); // Pretty print updated HTML
      };

      element.addEventListener('input', handleInputChange);

      return () => {
        element.removeEventListener('input', handleInputChange);
      };
    }
  }, [targetId]);

  const handleSourceCodeChange = (e) => {
    const updatedCode = e.target.value;
    setSourceCode(updatedCode);

    // Update the contenteditable div with formatted code
    const element = document.getElementById(targetId);
    if (element) {
      // element.innerHTML = updatedCode;
      element.outerHTML = updatedCode;
    }
  };

  const updateSourceCode = () => {
    const element = document.getElementById(targetId);
    if (element) {
      // setSourceCode(prettifyHTML(element.innerHTML));
      setSourceCode(prettifyHTML(element.outerHTML));
    }
  };

  return (
    <div id="sourcebox" style={{ display: revealed ? "block" : "none" }}>
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

export default SourceBox;
