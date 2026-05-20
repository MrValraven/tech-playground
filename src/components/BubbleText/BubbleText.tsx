import { useState } from "react";

const Example = () => {
  return (
      <BubbleText />
  );
};

const BubbleText = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getCharClass = (idx: number) => {
    if (hoveredIdx === null) return "font-thin text-indigo-300";

    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return "font-black text-indigo-100";
    if (distance === 1) return "font-medium text-indigo-200";
    if (distance === 2) return "font-light text-indigo-300";
    return "font-thin text-indigo-300";
  };

  return (
    <h2 className="text-center text-5xl text-indigo-300">
      {"Bubbbbbbbble text".split("").map((char, idx) => (
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
  );
};

export default Example;
