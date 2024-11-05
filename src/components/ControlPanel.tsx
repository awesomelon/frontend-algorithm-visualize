import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { AlgorithmType, sortingAlgorithms } from "../types/sorting";

interface ControlPanelProps {
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (alg: AlgorithmType) => void;
  arraySize: number;
  handleSizeChange: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  arraySize,
  handleSizeChange,
  speed,
  setSpeed,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <select
          value={selectedAlgorithm}
          onChange={(e) =>
            setSelectedAlgorithm(e.target.value as AlgorithmType)
          }
          className="px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(sortingAlgorithms).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">배열 크기:</span>
            <button
              onClick={() => handleSizeChange(Math.max(5, arraySize - 5))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <span className="w-8 text-center">{arraySize}</span>
            <button
              onClick={() => handleSizeChange(Math.min(50, arraySize + 5))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">속도:</span>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.5}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
