import { useState } from "react";

const DEFAULT_TEXT = "Hover over me";

const BubbleText = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [text, setText] = useState("");

  const displayText = text || DEFAULT_TEXT;

  const getCharClass = (idx: number) => {
    if (hoveredIdx === null) return "font-thin text-indigo-300";

    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return "font-black text-indigo-100";
    if (distance === 1) return "font-medium text-indigo-200";
    if (distance === 2) return "font-light text-indigo-300";
    return "font-thin text-indigo-300";
  };

  return (
    <div className="relative flex h-full items-center justify-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={DEFAULT_TEXT}
        className="absolute top-4 right-4 w-56 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-indigo-100 placeholder-white/30 outline-none transition-colors focus:border-indigo-400/60"
      />
      <h2
        className="max-w-[90%] text-center leading-tight break-words text-indigo-300 [overflow-wrap:anywhere]"
        style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
      >
        {displayText.split("").map((char, idx) => (
          <span
            key={idx}
            className={`transition-[font-weight,color] duration-[350ms] ${getCharClass(idx)}`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default BubbleText;
