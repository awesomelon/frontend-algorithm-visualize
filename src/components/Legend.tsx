import React from "react";

const Legend: React.FC = () => {
  return (
    <div className="bg-white rounded-b-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
          <span className="text-sm">미정렬</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
          <span className="text-sm">비교 중</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
          <span className="text-sm">교환 중</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
          <span className="text-sm">피벗</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
          <span className="text-sm">정렬 완료</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
