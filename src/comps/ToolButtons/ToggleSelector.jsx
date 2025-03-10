
import { useState, useEffect } from "react";

import {useSelectorStore} from '@stores/selectorStore';


export default function ToggleSelector({ target }) {

  // const [isActive, setIsActive] = useState(false);

  const { isSelectorActive, activateSelectorButton, deactivateSelectorButton } = useSelectorStore();


  const toggle = () => {
    

    if (target.current && typeof target.current.toggle === "function") {
      
      
      target.current.toggle();
      
      // activateSelectorButton();
      // setIsActive((prev) => !prev);
      
      activateSelectorButton();

    } else {
      console.warn("Target is not set or does not have a toggle method.");
      // deactivateSelectorButton();
    }
  };

  return <button
        id="inspector-toggle"
        onClick={toggle}
        style={{
          backgroundColor: isSelectorActive ? "#ff4d4d" : "#007bff",
        }}
      >
        {isSelectorActive ? "☛" : "♪"}
      </button>
}
