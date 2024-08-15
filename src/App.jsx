import React, { useState, useRef } from "react";
import Canvas from "./components/Canvas";
import Card from "./components/Card";
import Arrow from "./components/Arrow";
import Popup from "./components/Popup";

function App() {
    const [cards, setCards] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isDrawingArrow, setIsDrawingArrow] = useState(false);
    const [drawingArrow, setDrawingArrow] = useState(null);
    const canvasRef = useRef(null);
    const [text, setText] = useState("Hello World");
    const [isOpen, setIsOpen] = useState(false);

    const addCard = () => {
      setIsOpen(!isOpen)
        
    };
  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    const handleInputChange = (e) => {
      setText(e.target.value);
    };
  
    const handleSubmit = () => {
      const newCard = {
        id: Date.now(),
        text: text,
        position: { x: Math.random() * 100, y: Math.random() * 300 },
        size: { width: 200, height: 100 },
    };
    setCards([...cards, newCard]);
      setText('');
      setIsOpen(false);
    };

    const updateCardPosition = (id, position) => {
        setCards(cards.map((card) => (card.id === id ? { ...card, position } : card)));
    };

    const updateCardSize = (id, size) => {
        setCards(cards.map((card) => (card.id === id ? { ...card, size } : card)));
    };

    const openPopup = (card) => {
        setSelectedCard(card);
    };

    const closePopup = () => {
        setSelectedCard(null);
    };

    const toggleDrawArrowMode = () => {
        if (cards.length >= 2) {
            setIsDrawingArrow(!isDrawingArrow);
            if (isDrawingArrow) {
                setDrawingArrow(null);
            }
        } else {
            alert("Please add at least 2 cards to draw an arrow");
        }
    };

    const handleCardClick = (cardId, e) => {
        if (isDrawingArrow) {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const clickPoint = {
                x: e.clientX - canvasRect.left,
                y: e.clientY - canvasRect.top,
            };

            if (!drawingArrow) {
                setDrawingArrow({
                    startCardId: cardId,
                    start: clickPoint,
                    end: clickPoint,
                });
            } else if (drawingArrow.startCardId !== cardId) {
                const newArrow = {
                    id: Date.now(),
                    startCardId: drawingArrow.startCardId,
                    endCardId: cardId,
                    start: drawingArrow.start,
                    end: clickPoint,
                };
                setArrows([...arrows, newArrow]);
                setDrawingArrow(null);
                setIsDrawingArrow(false);
            }
        }
    };

    const updateDrawingArrow = (e) => {
        if (drawingArrow) {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const endPoint = {
                x: e.clientX - canvasRect.left,
                y: e.clientY - canvasRect.top,
            };
            setDrawingArrow((prev) => ({ ...prev, end: endPoint }));
        }
    };

    const deleteArrow = (arrowId) => {
        setArrows(arrows.filter((arrow) => arrow.id !== arrowId));
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <button onClick={addCard} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                        Add Card
                    </button>
                    <button onClick={toggleDrawArrowMode} className={`${isDrawingArrow ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded`}>
                        {isDrawingArrow ? "Cancel Arrow" : "Draw Arrow"}
                    </button>
                </div>
                <Canvas
                    ref={canvasRef}
                    onMouseMove={updateDrawingArrow}
                >
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            updatePosition={updateCardPosition}
                            updateSize={updateCardSize}
                            openPopup={openPopup}
                            onClick={handleCardClick}
                            isDrawingArrow={isDrawingArrow}
                        />
                    ))}
                    {arrows.map((arrow) => (
                        <Arrow key={arrow.id} arrow={arrow} onDelete={() => deleteArrow(arrow.id)} />
                    ))}
                    {drawingArrow && (
                        <Arrow arrow={drawingArrow} />
                    )}
                </Canvas>
                {selectedCard && <Popup card={selectedCard} onClose={closePopup} />}
                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                      <h2 className="text-2xl font-bold mb-4 text-stone-300">Enter Information</h2>
                      <input
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                        placeholder="Enter text here"
                        className="bg-zinc-800 text-stone-400 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      />
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={handleSubmit}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                        >
                          Submit
                        </button>
                        <button 
                          onClick={togglePopup}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
        </div>
    );
}

export default App;