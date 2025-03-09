import { forwardRef, useState, useEffect, useImperativeHandle } from 'react'

// import { useInView} from "react-intersection-observer";


import './sourcebox.scss';


const SourceBox = forwardRef( ({ targetId }, ref) => {

  const [sourceCode, setSourceCode] = useState('');

  const [revealed, setRevealed] = useState(false);

  // const toggle = () => setRevealed((prev) => !prev);

    // Expose a `toggle` method for the parent component
  useImperativeHandle(ref, () => ({
    toggle: () => {
      setRevealed((prev) => !prev)
      console.log("uuugh")
    }
  }));


  // Function to prettify the HTML without <body> and unwanted xmlns attributes
  const prettifyHTML = (html) => {
    // debugger
    return html;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // const yy = doc.body.innerHTML.replace(/></g, ">\n<");
    // console.log(yy)
    return doc.body.innerHTML.replace(/></g, ">\n<"); // Adds line breaks
  }


  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // });


  useEffect(() => {
    if (revealed) {
      console.log("SourceBox is now visible");
    }
  }, [revealed]);


  useEffect(() => {
    const element = document.getElementById(targetId);

    if (element) {
      // Set the initial formatted source code
      setSourceCode(prettifyHTML(element.innerHTML));

      // Event listener for content changes
      const handleInputChange = () => {
        setSourceCode(prettifyHTML(element.innerHTML)); // Pretty print updated HTML
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
      element.innerHTML = updatedCode;
    }
  };

  const updateSourceCode = () => {
    const element = document.getElementById(targetId);
    if (element) {
      // setSourceCode(element.outerHTML);
      setSourceCode(prettifyHTML(element.innerHTML));
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