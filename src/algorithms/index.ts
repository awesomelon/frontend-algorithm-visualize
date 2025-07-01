import {
  SortingStep,
  AlgorithmMarkdown,
  AlgorithmType,
} from "../types/sorting";
import { bubbleSortMarkdown, generateBubbleSortSteps } from "./bubbleSort.ts";
import {
  generateSelectionSortSteps,
  selectionSortMarkdown,
} from "./selectionSort.ts";
import {
  generateInsertionSortSteps,
  insertionSortMarkdown,
} from "./insertionSort.ts";
import { generateQuickSortSteps, quickSortMarkdown } from "./quickSort.ts";
import { generateMergeSortSteps, mergeSortMarkdown } from "./mergeSort.ts";
import { generateHeapSortSteps, heapSortMarkdown } from "./heapSort.ts";

/**
 * Dispatcher function to get sorting steps based on the algorithm type.
 * @param algorithm - The type of sorting algorithm.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const getSortingSteps = (
  algorithm: AlgorithmType,
  arr: number[]
): SortingStep[] => {
  switch (algorithm) {
    case "bubble":
      return generateBubbleSortSteps(arr);
    case "selection":
      return generateSelectionSortSteps(arr);
    case "insertion":
      return generateInsertionSortSteps(arr);
    case "quick":
      return generateQuickSortSteps(arr);
    case "merge":
      return generateMergeSortSteps(arr);
    case "heap":
      return generateHeapSortSteps(arr);
    default:
      return [];
  }
};

export const algorithmMarkdown: AlgorithmMarkdown = {
  bubble: bubbleSortMarkdown,
  selection: selectionSortMarkdown,
  insertion: insertionSortMarkdown,
  quick: quickSortMarkdown,
  merge: mergeSortMarkdown,
  heap: heapSortMarkdown,
};
