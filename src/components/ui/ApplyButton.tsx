import { useState } from "react";

export function ApplyButton() {
  const [showTruck, setShowTruck] = useState(false);
  const [showText, setShowText] = useState(true);

  const handleMouseEnter = () => {
    setShowText(false);
    setShowTruck(true);

    setTimeout(() => {
      setShowTruck(false);
      setShowText(true);
    }, 1200);
  };

  return (
    <button
      onClick={() => { /* твоя функция scrollToApplication */ }}
      onMouseEnter={handleMouseEnter}
      className="relative overflow-hidden bg-cta-orange hover:bg-red-600 text-white px-8 py-4 text-xl font-semibold w-full max-w-md rounded-lg transition-all flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-red-300 h-[60px]"
      type="button"
    >
      {/* Текст кнопки */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
          showText ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        Engine’s On — Apply in 2 Min 🚛
      </span>

      {/* Грузовик */}
      {showTruck && (
        <img
          src="/applynowtruck.png"
          alt="Truck"
          className="absolute h-10 animate-truck-move pointer-events-none"
          style={{ top: "50%", left: 0, transform: "translateY(-50%)" }} // центр по вертикали
        />
      )}
    </button>
  );
}
