import React from "react";
import { AlgorithmType, SortingAlgorithmInfo } from "../types/sorting";

interface AlgorithmDescriptionProps {
  selectedAlgorithm: AlgorithmType;
  sortingAlgorithms: Record<AlgorithmType, SortingAlgorithmInfo>;
}

const AlgorithmDescription: React.FC<AlgorithmDescriptionProps> = ({
  selectedAlgorithm,
  sortingAlgorithms,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="space-y-2">
        <div>
          <span className="font-medium">시간 복잡도:</span>{" "}
          <span className="text-gray-600">
            {sortingAlgorithms[selectedAlgorithm].complexity}
          </span>
        </div>
        <p className="text-gray-600">
          {sortingAlgorithms[selectedAlgorithm].description}
        </p>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
