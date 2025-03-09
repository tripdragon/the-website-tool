import { useState, useEffect, forwardRef, useImperativeHandle } from "react";


import { useSelectorStore } from "@stores/selectorStore.js";

import './selectortool.scss';

// export default function SelectorTool() {
const SelectorTool = forwardRef( (props, ref) => {


  const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [rect, setRect] = useState(null);

  const setSelectedElement = useSelectorStore((state) => state.setSelectedElement);

  const [revealed, setRevealed] = useState(false);


  useImperativeHandle(ref, () => ({
    toggle: () => {
      setRevealed((prev) => !prev)
      console.log("uuugh")
      setIsActive((prev) => !prev);
    }
  }));

  useEffect(() => {
    if (!isActive) return;

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
      if (event.target.id !== "inspector-toggle") {
        setSelectedElement(event.target);
        console.log("event.target", event.target);
      }
    };


    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [isActive, setSelectedElement]);


  return (
    <div id="selectortool">
      {/*<button
        id="inspector-toggle"
        onClick={() => setIsActive((prev) => !prev)}
        style={{
          backgroundColor: isActive ? "#ff4d4d" : "#007bff",
        }}
      >*/}
      {/*  {isActive ? "♪" : "☛"}
      </button>*/}

      {isActive && rect && (
        <div className="is-active"
          style={{
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          }}
        />
      )}

      {isActive && hoveredElement && (
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
