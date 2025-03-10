import { useState, useEffect, forwardRef, useImperativeHandle } from "react";


import { useSelectorStore } from "@stores/selectorStore.js";

import './selectortool.scss';



// export default function SelectorTool() {
const SelectorTool = forwardRef( (props, ref) => {

  const { isSelectorActive, deactivateSelectorButton } = useSelectorStore();

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
      deactivateSelectorButton();
    }
  }));

  useEffect(() => {
    if (!isSelectorActive) return;

    const handleMouseOver = (event) => {
      const target = event.target;

// console.log("?????");

      // Prevent highlighting the toggle button itself
      // if (target.closest("#toolsShelf")) return;

      const mainElement = event.target.closest('#content-main');

      // if (mainElement && mainElement === document.body 
      //   || mainElement === document.documentElement
      //   || mainElement?.id === "site" ) {
      //   return;
      // }


      // if (target.id === "inspector-toggle" || target.id === "tools") return;

      setHoveredElement(target);
      setRect(target.getBoundingClientRect());
    };


    const handleMouseDown = (event) => {
      event.preventDefault(); // Prevent default clicks
      const mainElement = event.target.closest('#content-main');
      // const mainElement = event.target.closest('#site');

        // console.log("event.target", event.target);
        // console.log("mainElement", mainElement);
      // if (event.target.id !== "inspector-toggle") {
        // debugger
      // if(mainElement){

      console.log("111event.target", event.target);
      console.log("111mainElement", mainElement);

      let pick = event.target;
      // debugger
      if(mainElement === null && event?.target?.id === "site"){
        pick = document.getElementById("content-main");
      }
      else if(pick === document.body || pick === document.documentElement){
        return;
      }
        setSelectedElement(pick);
        
        deactivateSelectorButton();

      console.log("pick", pick);


      // this might break it
      //       document.removeEventListener("mouseover", handleMouseOver);
      // document.removeEventListener("mousedown", handleMouseDown);



      // if(event.target?.id === "content-main" || mainElement){
      //   console.log("222event.target", event.target);
      //   console.log("222mainElement", mainElement);
      // }

      // if (mainElement && mainElement !== document.body && mainElement !== document.documentElement) {
      //   setSelectedElement(event.target);
      //   // setIsActive(false);
      //   deactivateSelectorButton();
      // }
    };


    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
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
          {hoveredElement?.id && `.${hoveredElement?.id}`}
        </div>
      )}
    </div>
  );
});


export default SelectorTool;
