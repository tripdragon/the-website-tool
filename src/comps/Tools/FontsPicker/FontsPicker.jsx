// import { useEffect, useState } from "react";
// import "./fontspicker.scss";

// const FontsPicker = ({ options, onChange }) => {
//   const [selected, setSelected] = useState(options[0]?.value || "");

//   useEffect(() => {
//     const styleTag = document.createElement("style");
//     styleTag.id = "dynamic-fonts";

//     const fontFaces = options
//       .map(
//         (option) => `
//         @font-face {
//           font-family: '${option.value}';
//           src: url('${option.url}') format('${option.format}');
//         }
//       `
//       )
//       .join("\n");

//     styleTag.innerHTML = fontFaces;
//     document.head.appendChild(styleTag);

//     return () => {
//       document.getElementById("dynamic-fonts")?.remove();
//     };
//   }, [options]);

//   const handleChange = (event) => {
//     setSelected(event.target.value);
//     onChange?.(event.target.value);
//   };

//   return (
//     <select value={selected} onChange={handleChange} id="fontsPicker">
//       {options.map((option) => (
//         <option
//           key={option.value}
//           value={option.value}
//           style={{ fontFamily: option.value }}
//         >
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default FontsPicker;







import "./fontspicker.scss";


import { useState, useEffect } from "react";

// const fonts = [
//   { label: "Arial", value: "Arial, sans-serif" },
//   { label: "Courier New", value: "'Courier New', monospace" },
//   { label: "Georgia", value: "Georgia, serif" },
//   { label: "Times New Roman", value: "'Times New Roman', serif" },
//   { label: "Verdana", value: "Verdana, sans-serif" },
// ];

export default function FontsPicker({ fonts, onChange }) {
  const [selectedFont, setSelectedFont] = useState(fonts[0].value);
  const [isOpen, setIsOpen] = useState(false);

  // this injects another style tag with the fonts
  // could merge this with the main style sheet
  useEffect(() => {
  	const site = document.getElementById("site");
    const styleTag = document.createElement("style");
    styleTag.id = "dynamic-fonts";

    const fontFaces = fonts
      .map(
        (font) => `
        @font-face {
          font-family: '${font.value}';
          src: url('${font.url}') format('${font.format}');
        }
      `
      )
      .join("\n");

    styleTag.innerHTML = fontFaces;
    // document.head.appendChild(styleTag);
    // site.appendChild(styleTag);
    site.prepend(styleTag);

    return () => {
      document.getElementById("dynamic-fonts")?.remove();
    };
  }, [fonts]);


  const handleChange = (value) => {
    setSelectedFont(value);
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div id="font-picker">
      <button
        className="picker-button"
        style={{ fontFamily: selectedFont }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {fonts.find((f) => f.value === selectedFont)?.label}
      </button>
      {isOpen && (
        <ul className="picker-dropdown">
          {fonts.map((font) => (
            <li
              key={font.value}
              style={{ fontFamily: font.value }}
              onClick={() => handleChange(font.value) }
            >
              {font.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
