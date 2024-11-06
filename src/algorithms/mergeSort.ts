import { ArrayState, SortingStep } from "../types/sorting.ts";

/**
 * Generates the sorting steps for Merge Sort.
 */
export const generateMergeSortSteps = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  /**
   * The main Merge Sort recursive function.
   * @param left - The starting index.
   * @param right - The ending index.
   */
  const mergeSort = (left: number, right: number) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  };

  /**
   * Merges two subarrays of array.
   * @param left - The starting index of the first subarray.
   * @param mid - The ending index of the first subarray.
   * @param right - The ending index of the second subarray.
   */
  const merge = (left: number, mid: number, right: number) => {
    const leftSub = array.slice(left, mid + 1);
    const rightSub = array.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    // 병합 시작 단계 추가
    steps.push({
      array: [...array],
      states: array.map((_, index) =>
        index >= left && index <= right
          ? ArrayState.MERGING
          : ArrayState.UNSORTED,
      ),
      stats: { comparisons, swaps },
    });

    while (i < leftSub.length && j < rightSub.length) {
      comparisons++;

      // 비교 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) =>
          index === left + i || index === mid + 1 + j
            ? ArrayState.COMPARING
            : index >= left && index <= right
              ? ArrayState.MERGING
              : ArrayState.UNSORTED,
        ),
        stats: { comparisons, swaps },
      });

      if (leftSub[i] <= rightSub[j]) {
        array[k] = leftSub[i];
        i++;
      } else {
        array[k] = rightSub[j];
        j++;
      }
      swaps++;

      // 교환 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) =>
          index === k
            ? ArrayState.SWAPPING
            : index >= left && index <= right
              ? ArrayState.MERGING
              : ArrayState.UNSORTED,
        ),
        stats: { comparisons, swaps },
      });
      k++;
    }

    while (i < leftSub.length) {
      array[k] = leftSub[i];
      swaps++;

      // 교환 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) =>
          index === k
            ? ArrayState.SWAPPING
            : index >= left && index <= right
              ? ArrayState.MERGING
              : ArrayState.UNSORTED,
        ),
        stats: { comparisons, swaps },
      });
      i++;
      k++;
    }

    while (j < rightSub.length) {
      array[k] = rightSub[j];
      swaps++;

      // 교환 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) =>
          index === k
            ? ArrayState.SWAPPING
            : index >= left && index <= right
              ? ArrayState.MERGING
              : ArrayState.UNSORTED,
        ),
        stats: { comparisons, swaps },
      });
      j++;
      k++;
    }
  };

  // 시작 Merge Sort 호출
  mergeSort(0, array.length - 1);

  // 최종 정렬 완료 상태 추가
  steps.push({
    array: array,
    states: new Array(array.length).fill(ArrayState.SORTED),
    stats: { comparisons, swaps },
  });

  return steps;
};

export const mergeSortMarkdown = {
  // 병합 정렬 마크다운 추가
  javascript: `### Merge Sort - JavaScript
\`\`\`javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}
\`\`\``,
  java: `### Merge Sort - Java
\`\`\`java
public static void mergeSort(int[] arr) {
    if (arr.length <= 1) return;
    mergeSort(arr, 0, arr.length - 1);
}

private static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    System.arraycopy(arr, left, L, 0, n1);
    System.arraycopy(arr, mid + 1, R, 0, n2);
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
\`\`\``,
};
