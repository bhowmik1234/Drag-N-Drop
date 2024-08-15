import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function Card({ card, updatePosition, updateSize, openPopup, onClick, isDrawingArrow }) {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResize = (event, { size }) => {
    updateSize(card.id, size);
  };

  const onResizeStop = () => {
    setIsResizing(false);
  };

  const onDragStart = (e) => {
    if (isResizing) return;
    setIsDragging(true);
    const startX = e.clientX - card.position.x;
    const startY = e.clientY - card.position.y;

    const onDrag = (e) => {
      updatePosition(card.id, {
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const onDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragEnd);
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
  };

  const handleClick = (e) => {
    if (!isDragging && !isResizing) {
      onClick(card.id, e);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`absolute bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden ${isDrawingArrow ? 'cursor-crosshair' : 'cursor-move'}`}
      style={{
        left: card.position.x,
        top: card.position.y,
      }}
      onClick={handleClick}
    >
      <ResizableBox
        width={card.size.width}
        height={card.size.height}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeStop={onResizeStop}
        minConstraints={[200, 100]} 
        maxConstraints={[300, 200]} 
        className={`${isDragging ? 'opacity-75' : ''}`}
      >
        <div 
          className="p-4 h-full flex flex-col justify-between"
          onMouseDown={onDragStart}
        >
          <p className="text-sm">{card.text.substring(0, 50)}...</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              openPopup(card);
            }} 
            className='mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200'
          >
            Show More
          </button>
        </div>
      </ResizableBox>
    </div>
  );
}

export default Card;