import React from "react";
import { ArrayState } from "../types/sorting";

interface SortingBarsProps {
  array: number[];
  arrayStates: ArrayState[];
  getBarColor: (state: ArrayState) => string;
  arraySize: number;
}

const SortingBars: React.FC<SortingBarsProps> = ({
  array,
  arrayStates,
  getBarColor,
  arraySize,
}) => {
  return (
    <div className="bg-white rounded-t-lg shadow-md p-6">
      <div className="w-full h-[400px] flex items-end justify-center gap-1">
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${(value / 100) * 100}%`,
              width: `${Math.max(8, Math.min(20, Math.floor(800 / arraySize)))}px`,
              transition: "all 0.3s ease",
            }}
            className={`${getBarColor(arrayStates[index])} rounded-t-md transform hover:brightness-110`}
            role="presentation"
            aria-label={`Value: ${value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingBars;
