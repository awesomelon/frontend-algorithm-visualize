import { ArrayState, SortingStep } from "../types/sorting";

/**
 * Generates the sorting steps for Heap Sort.
 * @param arr - The array to sort.
 * @returns An array of SortingStep representing each step of the algorithm.
 */
export const generateHeapSortSteps = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const stats = { comparisons: 0, swaps: 0 };

  // 초기 상태 추가
  steps.push({
    array: [...array],
    states: new Array(array.length).fill(ArrayState.UNSORTED),
    stats: { ...stats },
  });

  // 빈 배열이나 단일 요소 배열은 이미 정렬됨
  if (array.length <= 1) {
    // 최종 정렬 완료 상태 추가
    steps.push({
      array: array,
      states: new Array(array.length).fill(ArrayState.SORTED),
      stats: { ...stats },
    });
    return steps;
  }

  // 힙 구성 (Build Max Heap)
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, steps, stats);
  }

  // 힙에서 요소를 하나씩 추출
  for (let i = n - 1; i > 0; i--) {
    // 루트(최대값)를 현재 마지막 요소와 교환
    stats.swaps++;
    [array[0], array[i]] = [array[i], array[0]];

    // 교환 상태 추가
    steps.push({
      array: [...array],
      states: array.map((_, index) => {
        if (index === 0 || index === i) return ArrayState.SWAPPING;
        if (index > i) return ArrayState.SORTED;
        return ArrayState.UNSORTED;
      }),
      stats: { ...stats },
    });

    // 루트 노드를 힙 속성을 만족하도록 재조정
    heapify(array, i, 0, steps, stats);
  }

  // 최종 정렬 완료 상태 추가
  steps.push({
    array: array,
    states: new Array(array.length).fill(ArrayState.SORTED),
    stats: { ...stats },
  });

  return steps;
};

/**
 * 주어진 노드를 루트로 하는 서브트리를 힙 속성을 만족하도록 재조정
 */
function heapify(
  arr: number[],
  n: number,
  i: number,
  steps: SortingStep[],
  stats: { comparisons: number; swaps: number }
): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // 왼쪽 자식과 비교
  if (left < n) {
    stats.comparisons++;

    // 비교 상태 추가
    steps.push({
      array: [...arr],
      states: arr.map((_, index) => {
        if (index === largest || index === left) return ArrayState.COMPARING;
        if (index >= n) return ArrayState.SORTED;
        return ArrayState.UNSORTED;
      }),
      stats: { ...stats },
    });

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  // 오른쪽 자식과 비교
  if (right < n) {
    stats.comparisons++;

    // 비교 상태 추가
    steps.push({
      array: [...arr],
      states: arr.map((_, index) => {
        if (index === largest || index === right) return ArrayState.COMPARING;
        if (index >= n) return ArrayState.SORTED;
        return ArrayState.UNSORTED;
      }),
      stats: { ...stats },
    });

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  // 가장 큰 값이 루트가 아니면 교환하고 재귀 호출
  if (largest !== i) {
    stats.swaps++;
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // 교환 상태 추가
    steps.push({
      array: [...arr],
      states: arr.map((_, index) => {
        if (index === i || index === largest) return ArrayState.SWAPPING;
        if (index >= n) return ArrayState.SORTED;
        return ArrayState.UNSORTED;
      }),
      stats: { ...stats },
    });

    heapify(arr, n, largest, steps, stats);
  }
}

export const heapSortMarkdown = {
  javascript: `### Heap Sort - JavaScript
\`\`\`javascript
function heapSort(arr) {
    const n = arr.length;
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
\`\`\``,
  java: `### Heap Sort - Java
\`\`\`java
public static void heapSort(int[] arr) {
    int n = arr.length;
    
    // Build heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        heapify(arr, n, largest);
    }
}
\`\`\``,
};
