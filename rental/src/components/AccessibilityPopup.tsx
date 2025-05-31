import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AccessibilityPopup() {
  const [fontSize, setFontSize] = useState(16); // base font size in px
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRead = () => {
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed top-8 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="mt-2 p-6 w-80 bg-white dark:bg-gray-800 dark:text-white text-black rounded-xl shadow-2xl"
      >
        <h2 className="text-xl font-bold mb-4">Accessibility Options</h2>

        <div className="mb-4">
          <p className="font-semibold mb-2">Font Size:</p>
          <div className="flex gap-2">
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize(16)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            >
              A
            </button>
            <button
              onClick={() => setFontSize((prev) => prev + 2)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            >
              A+
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Contrast Switch:</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contrast"
                checked={darkMode}
                onChange={() => setDarkMode(true)}
              />
              Colour Blind
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contrast"
                checked={!darkMode}
                onChange={() => setDarkMode(false)}
              />
              DTCM Colours
            </label>
          </div>
        </div>

        <div className="mb-2">
          <p className="font-semibold mb-2">Read Speaker:</p>
          <button
            onClick={handleRead}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Listen
          </button>
        </div>
      </motion.div>
    </div>
  );
}
