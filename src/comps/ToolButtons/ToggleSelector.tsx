
import { useState, useEffect } from "react";


export default function ToggleSelector({ target }) {

  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
      // debugger
    if (target.current && typeof target.current.toggle === "function") {
      target.current.toggle();
              setIsActive((prev) => !prev);

    } else {
      console.warn("Target is not set or does not have a toggle method.");
    }
  };

  return <button
        id="inspector-toggle"
        onClick={toggle}
        style={{
          backgroundColor: isActive ? "#ff4d4d" : "#007bff",
        }}
      >
        {isActive ? "☛" : "♪"}
      </button>
}
