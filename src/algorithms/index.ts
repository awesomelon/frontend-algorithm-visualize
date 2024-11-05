/* ./src/algorithms/index.ts */
import {
  SortingStep,
  ArrayState,
  AlgorithmMarkdown,
  AlgorithmType,
} from "../types/sorting";

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

    while (j >= 0 && array[j] > key) {
      comparisons++;
      swaps++;
      array[j + 1] = array[j];

      // 교환 상태 추가
      steps.push({
        array: [...array],
        states: array.map((_, index) => {
          if (index === j || index === j + 1) return ArrayState.SWAPPING;
          if (index < i) return ArrayState.SORTED;
          return ArrayState.UNSORTED;
        }),
        stats: { comparisons, swaps },
      });

      j--;
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
        index === right ? ArrayState.PIVOT : ArrayState.UNSORTED,
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
                : ArrayState.UNSORTED,
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
          : ArrayState.UNSORTED,
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

/**
 * Dispatcher function to get sorting steps based on the algorithm type.
 * @param algorithm - The type of sorting algorithm.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const getSortingSteps = (
  algorithm: AlgorithmType,
  arr: number[],
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
    default:
      return [];
  }
};

export const algorithmMarkdown: AlgorithmMarkdown = {
  bubble: {
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
  },
  selection: {
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
  },
  insertion: {
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
  },
  quick: {
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
  },
  merge: {
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
  },
};
