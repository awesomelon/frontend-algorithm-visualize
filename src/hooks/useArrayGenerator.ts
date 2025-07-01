import { useCallback } from "react";
import { ArrayState, Stats } from "../types/sorting";

export const useArrayGenerator = () => {
  const generateArray = useCallback((size: number = 15) => {
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 80) + 10
    );
    const newStates = new Array(size).fill(ArrayState.UNSORTED);
    const newStats: Stats = { comparisons: 0, swaps: 0 };

    return {
      array: newArray,
      states: newStates,
      stats: newStats,
    };
  }, []);

  return { generateArray };
};
