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