import { ArrayState, SortingStep } from "../types/sorting.ts";

/**
 * Generates the sorting steps for Selection Sort.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const generateSelectionSortSteps = (arr: number[]): SortingStep[] => {
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
    let minIdx = i;

    for (let j = i + 1; j < array.length; j++) {
      comparisons++;

      // 비교 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) => {
          if (index === j) return ArrayState.COMPARING;
          if (index === minIdx) return ArrayState.PIVOT;
          if (index < i) return ArrayState.SORTED;
          return ArrayState.UNSORTED;
        }),
        stats: { comparisons, swaps },
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swaps++;
      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      // 교환 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) => {
          if (index === i || index === minIdx) return ArrayState.SWAPPING;
          if (index < i + 1) return ArrayState.SORTED;
          return ArrayState.UNSORTED;
        }),
        stats: { comparisons, swaps },
      });
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

export const selectionSortMarkdown = {
  javascript: `### Selection Sort - JavaScript
\`\`\`javascript
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}
\`\`\``,
  java: `### Selection Sort - Java
\`\`\`java
public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}
\`\`\``,
};
