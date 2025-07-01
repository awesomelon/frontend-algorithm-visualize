import { ArrayState, SortingStep } from "../types/sorting.ts";

/**
 * Generates the sorting steps for Quick Sort.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const generateQuickSortSteps = (arr: number[]): SortingStep[] => {
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

  /**
   * The main Quick Sort recursive function.
   * @param left - The starting index.
   * @param right - The ending index.
   */
  const quickSort = (left: number, right: number) => {
    if (left >= right) return;

    const pivot = array[right];
    let i = left - 1;

    // 피벗 설정 단계 추가
    steps.push({
      array: [...array],
      states: array.map((_, index) =>
        index === right ? ArrayState.PIVOT : ArrayState.UNSORTED
      ),
      stats: { comparisons, swaps },
    });

    for (let j = left; j < right; j++) {
      comparisons++;

      // 비교 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) => {
          if (index === j) return ArrayState.COMPARING;
          if (index === right) return ArrayState.PIVOT;
          return ArrayState.UNSORTED;
        }),
        stats: { comparisons, swaps },
      });

      if (array[j] <= pivot) {
        i++;
        swaps++;
        [array[i], array[j]] = [array[j], array[i]];

        // 교환 상태 추가
        steps.push({
          array: [...array],
          states: array.map((_, index) =>
            index === i || index === j
              ? ArrayState.SWAPPING
              : index === right
                ? ArrayState.PIVOT
                : ArrayState.UNSORTED
          ),
          stats: { comparisons, swaps },
        });
      }
    }

    swaps++;
    [array[i + 1], array[right]] = [array[right], array[i + 1]];

    // 피벗 교환 상태 추가
    steps.push({
      array: [...array],
      states: array.map((_, index) =>
        index === i + 1 || index === right
          ? ArrayState.SWAPPING
          : ArrayState.UNSORTED
      ),
      stats: { comparisons, swaps },
    });

    quickSort(left, i);
    quickSort(i + 2, right);
  };

  // 시작 Quick Sort 호출
  quickSort(0, array.length - 1);

  // 최종 정렬 완료 상태 추가
  steps.push({
    array: array,
    states: new Array(array.length).fill(ArrayState.SORTED),
    stats: { comparisons, swaps },
  });

  return steps;
};

export const quickSortMarkdown = {
  javascript: `### Quick Sort - JavaScript
\`\`\`javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
\`\`\``,
  java: `### Quick Sort - Java
\`\`\`java
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}
\`\`\``,
};
