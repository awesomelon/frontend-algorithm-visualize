/* ./src/types/sorting.ts */
export enum ArrayState {
  UNSORTED = "unsorted",
  COMPARING = "comparing",
  SWAPPING = "swapping",
  SORTED = "sorted",
  PIVOT = "pivot",
  MERGING = "merging",
}

export type AlgorithmType =
  | "bubble"
  | "selection"
  | "insertion"
  | "quick"
  | "merge"
  | "heap";
export type LanguageType = "javascript" | "java";

export interface SortingAlgorithmInfo {
  name: string;
  complexity: string;
  description: string;
}

export interface Stats {
  comparisons: number;
  swaps: number;
}

export interface SortingStep {
  array: number[];
  states: ArrayState[];
  stats: Stats;
}

export const sortingAlgorithms: Record<AlgorithmType, SortingAlgorithmInfo> = {
  bubble: {
    name: "버블 정렬",
    complexity: "O(n²)",
    description: "인접한 두 요소를 비교하여 정렬하는 간단한 알고리즘입니다.",
  },
  selection: {
    name: "선택 정렬",
    complexity: "O(n²)",
    description: "최솟값을 찾아 순차적으로 정렬하는 알고리즘입니다.",
  },
  insertion: {
    name: "삽입 정렬",
    complexity: "O(n²)",
    description: "각 요소를 적절한 위치에 삽입하며 정렬하는 알고리즘입니다.",
  },
  quick: {
    name: "퀵 정렬",
    complexity: "O(n log n)",
    description:
      "피벗을 기준으로 분할 정복하여 정렬하는 효율적인 알고리즘입니다.",
  },
  merge: {
    name: "병합 정렬",
    complexity: "O(n log n)",
    description:
      "배열을 재귀적으로 분할한 후 병합하여 정렬하는 안정적인 알고리즘입니다.",
  },
  heap: {
    name: "힙 정렬",
    complexity: "O(n log n)",
    description:
      "힙 자료구조를 이용하여 정렬하는 효율적이고 안정적인 알고리즘입니다.",
  },
};

export type AlgorithmMarkdown = Record<
  AlgorithmType,
  Record<LanguageType, string>
>;
