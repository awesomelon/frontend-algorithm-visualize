import { ArrayState, SortingStep } from "../types/sorting.ts";

/**
 * Generates the sorting steps for Insertion Sort.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const generateInsertionSortSteps = (arr: number[]): SortingStep[] => {
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

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    // 현재 키를 피벗으로 설정
    steps.push({
      array: [...array],
      states: array.map((_, index) => {
        if (index === i) return ArrayState.PIVOT;
        if (index < i) return ArrayState.SORTED;
        return ArrayState.UNSORTED;
      }),
      stats: { comparisons, swaps },
    });

    while (j >= 0) {
      comparisons++;

      // 비교 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) => {
          if (index === j) return ArrayState.COMPARING;
          if (index === i) return ArrayState.PIVOT;
          if (index < j) return ArrayState.SORTED;
          return ArrayState.UNSORTED;
        }),
        stats: { comparisons, swaps },
      });

      if (array[j] > key) {
        swaps++;
        array[j + 1] = array[j];

        // 교환 상태 추가
        steps.push({
          array: [...array],
          states: array.map((_, index) => {
            if (index === j || index === j + 1) return ArrayState.SWAPPING;
            if (index < j) return ArrayState.SORTED;
            return ArrayState.UNSORTED;
          }),
          stats: { comparisons, swaps },
        });
        j--;
      } else {
        break;
      }
    }
    array[j + 1] = key;
  }

  // 최종 정렬 완료 상태 추가
  steps.push({
    array: array,
    states: new Array(array.length).fill(ArrayState.SORTED),
    stats: { comparisons, swaps },
  });

  return steps;
};

export const insertionSortMarkdown = {
  javascript: `### Insertion Sort - JavaScript
\`\`\`javascript
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
\`\`\``,
  java: `### Insertion Sort - Java
\`\`\`java
public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}
\`\`\``,
};
