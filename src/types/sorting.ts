export enum ArrayState {
  UNSORTED = "unsorted",
  COMPARING = "comparing",
  SWAPPING = "swapping",
  SORTED = "sorted",
  PIVOT = "pivot",
}

export type AlgorithmType = "bubble" | "selection" | "insertion" | "quick";
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
};

// 중첩된 Record 타입을 사용하여 매핑
export type AlgorithmMarkdown = Record<
  AlgorithmType,
  Record<LanguageType, string>
>;
