import { ArrayState, SortingStep } from "../types/sorting.ts";

/**
 * Generates the sorting steps for Bubble Sort.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const generateBubbleSortSteps = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  // 초기 상태 추가
  steps.push({
    array: [...array],
    states: new Array(array.length).fill(ArrayState.UNSORTED),
    stats: { comparisons, swaps },
  });

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons++;

      // 비교 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) =>
          index === j || index === j + 1
            ? ArrayState.COMPARING
            : index >= array.length - i
              ? ArrayState.SORTED
              : ArrayState.UNSORTED,
        ),
        stats: { comparisons, swaps },
      });

      if (array[j] > array[j + 1]) {
        swaps++;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // 교환 상태 추가
        steps.push({
          array: [...array],
          states: array.map((_, index) =>
            index === j || index === j + 1
              ? ArrayState.SWAPPING
              : index >= array.length - i
                ? ArrayState.SORTED
                : ArrayState.UNSORTED,
          ),
          stats: { comparisons, swaps },
        });
      }
    }
  }

  // 최종 정렬 완료 상태 추가
  steps.push({
    array: array,
    states: new Array(array.length).fill(ArrayState.SORTED),
    stats: { comparisons, swaps },
  });

  return steps;
};

export const bubbleSortMarkdown = {
  javascript: `### Bubble Sort - JavaScript
\`\`\`javascript
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
\`\`\``,
  java: `### Bubble Sort - Java
\`\`\`java
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
\`\`\``,
};
