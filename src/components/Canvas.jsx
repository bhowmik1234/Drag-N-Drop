import React, { forwardRef } from 'react';

const Canvas = forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className="w-full h-screen relative overflow-hidden ">
      {children}
    </div>
  );
});

export default Canvas;