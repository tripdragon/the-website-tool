import { useState, useEffect, forwardRef, useImperativeHandle } from "react";


import { useSelectorStore } from "@stores/selectorStore.js";

import './selectortool.scss';



// export default function SelectorTool() {
const SelectorTool = forwardRef( (props, ref) => {

  const { isSelectorActive, deactivateButton } = useSelectorStore();

  // const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [rect, setRect] = useState(null);

  const setSelectedElement = useSelectorStore((state) => state.setSelectedElement);

  const [revealed, setRevealed] = useState(false);

  // this sends to 
  useImperativeHandle(ref, () => ({
    toggle: () => {
      setRevealed((prev) => !prev)
      console.log("uuugh")
      // setIsActive((prev) => !prev);
      deactivateButton();
    }
  }));

  useEffect(() => {
    if (!isSelectorActive) return;

    const handleMouseOver = (event) => {
      const target = event.target;

      // Prevent highlighting the toggle button itself
      if (target.closest("#toolsShelf")) return;
      // if (target.id === "inspector-toggle" || target.id === "tools") return;

      setHoveredElement(target);
      setRect(target.getBoundingClientRect());
    };


    const handleClick = (event) => {
      event.preventDefault(); // Prevent default clicks
      // const mainElement = event.target.closest('#content-main');
      const mainElement = event.target.closest('#site');

      // if (event.target.id !== "inspector-toggle") {
        // debugger
      if(mainElement){
        setSelectedElement(event.target);
        console.log("event.target", event.target);
        // setIsActive(false);
        deactivateButton();
      }
    };


    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [isSelectorActive, setSelectedElement]);


  return (
    <div id="selectortool">
      {/*<button
        id="inspector-toggle"
        onClick={() => setIsActive((prev) => !prev)}
        style={{
          background-color: isActive ? "#ff4d4d" : "#007bff",
        }}
      >*/}
      {/*  {isActive ? "♪" : "☛"}
      </button>*/}

      {isSelectorActive && rect && (
        <div className="is-active"
          style={{
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          }}
        />
      )}

      {isSelectorActive && hoveredElement && (
        <div
          style={{
            position: "fixed",
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX,
            backgroundColor: "#000",
            color: "#fff",
            padding: "5px",
            fontSize: "12px",
            borderRadius: "3px",
            zIndex: 102,
          }}
        >
          {hoveredElement.tagName.toLowerCase()}
          {hoveredElement.className && `.${hoveredElement.className}`}
        </div>
      )}
    </div>
  );
});


export default SelectorTool;
