import React from 'react';

function Arrow({ arrow, onDelete }) {
  const { start, end } = arrow;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const length = Math.sqrt(dx * dx + dy * dy);

  const arrowStyle = {
    position: 'absolute',
    left: `${start.x}px`,
    top: `${start.y}px`,
    width: `${length}px`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0 0',
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="group" style={arrowStyle}>
      <div className="h-0.5 bg-white w-full"></div>
      <div className="absolute right-0 top-1/2 w-0 h-0 border-l-[10px] border-l-white border-y-[5px] border-y-transparent transform -translate-y-1/2"></div>
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Arrow;