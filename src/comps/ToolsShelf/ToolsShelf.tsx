import React, { useState, useRef, useEffect } from 'react';

import './toolsShelf.scss';

export default function ToolsShelf(props) {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const lastX = useRef(0);
  const lastY = useRef(0);

  const _toolShelf = useRef();
  const _handle = useRef();

  useEffect(() => {
    const handleElement = _handle.current;
    const toolbarElement = _toolShelf.current;

    const onMouseMove = (e) => {
    	// console.log("¿¿¿¿¿????")
      // if (dragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      // }
    };

    const onMouseDown = (e) => {
    	console.log("sldkfnslkfng")
      
        const rect = toolbarElement.getBoundingClientRect();
        setDragging(true);
        setOffset({
          x: e.clientX - rect.x,
          y: e.clientY - rect.y,
        });
		document.addEventListener('mousemove', onMouseMove);
	    document.addEventListener('mouseup', onMouseUp);
      
    };

    const onMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    handleElement.addEventListener('mousedown', onMouseDown);

    return () => {
      handleElement.removeEventListener('mousedown', onMouseDown);
    };
  }, [dragging, offset]);

  const toolbarStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: dragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={_toolShelf}
      id="toolsShelf"
      style={toolbarStyle}
    >
      <div id="handle" ref={_handle}>
        <span>☰</span>
      </div>

      <div id="toolbar-content">
        {props.children}
      </div>
    </div>
  );
}
