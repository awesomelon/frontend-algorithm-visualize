import React from "react";
import { Play, Pause, SkipBack, RefreshCcw } from "lucide-react";
import { Stats } from "../types/sorting";

interface PlaybackControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  reset: () => void;
  startSorting: () => void;
  stats: Stats;
  disablePlay: boolean;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  togglePlay,
  reset,
  startSorting,
  stats,
  disablePlay,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlay}
            disabled={disablePlay}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={reset}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="text-sm">
            <span className="text-gray-600">비교 횟수:</span>{" "}
            <span className="font-medium">{stats.comparisons}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">교환 횟수:</span>{" "}
            <span className="font-medium">{stats.swaps}</span>
          </div>
        </div>

        <button
          onClick={startSorting}
          disabled={isPlaying}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          정렬 시작
        </button>
      </div>
    </div>
  );
};

export default PlaybackControls;
