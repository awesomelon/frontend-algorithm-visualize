import { describe, test, expect } from "vitest";
import { generateHeapSortSteps } from "../heapSort";
import { ArrayState, SortingStep } from "../../types/sorting";

describe("Heap Sort Algorithm", () => {
  test("정렬된 배열을 반환해야 한다", () => {
    // Given: 정렬되지 않은 배열
    const inputArray = [64, 34, 25, 12, 22, 11, 90];
    const expectedSorted = [11, 12, 22, 25, 34, 64, 90];

    // When: 힙 정렬 단계를 생성
    const steps = generateHeapSortSteps(inputArray);

    // Then: 마지막 단계의 배열이 정렬되어 있어야 함
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual(expectedSorted);
  });

  test("초기 상태에서 모든 요소가 UNSORTED 상태여야 한다", () => {
    // Given
    const inputArray = [4, 10, 3, 5, 1];

    // When
    const steps = generateHeapSortSteps(inputArray);

    // Then: 첫 번째 단계의 모든 상태가 UNSORTED
    const initialStep = steps[0];
    expect(initialStep.states).toEqual([
      ArrayState.UNSORTED,
      ArrayState.UNSORTED,
      ArrayState.UNSORTED,
      ArrayState.UNSORTED,
      ArrayState.UNSORTED,
    ]);
  });

  test("최종 상태에서 모든 요소가 SORTED 상태여야 한다", () => {
    // Given
    const inputArray = [4, 10, 3, 5, 1];

    // When
    const steps = generateHeapSortSteps(inputArray);

    // Then: 마지막 단계의 모든 상태가 SORTED
    const finalStep = steps[steps.length - 1];
    expect(finalStep.states).toEqual([
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
    ]);
  });

  test("COMPARING 상태가 올바르게 설정되어야 한다", () => {
    // Given
    const inputArray = [4, 10, 3, 5, 1];

    // When
    const steps = generateHeapSortSteps(inputArray);

    // Then: 비교 단계가 존재해야 함
    const comparingSteps = steps.filter((step: SortingStep) =>
      step.states.includes(ArrayState.COMPARING)
    );
    expect(comparingSteps.length).toBeGreaterThan(0);
  });

  test("SWAPPING 상태가 올바르게 설정되어야 한다", () => {
    // Given
    const inputArray = [4, 10, 3, 5, 1];

    // When
    const steps = generateHeapSortSteps(inputArray);

    // Then: 교환 단계가 존재해야 함
    const swappingSteps = steps.filter((step: SortingStep) =>
      step.states.includes(ArrayState.SWAPPING)
    );
    expect(swappingSteps.length).toBeGreaterThan(0);
  });

  test("통계 정보가 올바르게 계산되어야 한다", () => {
    // Given: 간단한 배열
    const inputArray = [3, 2, 1];

    // When
    const steps = generateHeapSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then: 비교와 교환이 발생해야 함
    expect(finalStep.stats.comparisons).toBeGreaterThan(0);
    expect(finalStep.stats.swaps).toBeGreaterThan(0);
  });

  test("이미 정렬된 배열을 처리해야 한다", () => {
    // Given: 이미 정렬된 배열
    const inputArray = [1, 2, 3, 4, 5];

    // When
    const steps = generateHeapSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
    expect(finalStep.stats.comparisons).toBeGreaterThan(0); // 힙 구성 과정에서 비교 발생
  });

  test("역순 배열을 처리해야 한다", () => {
    // Given: 역순 배열
    const inputArray = [5, 4, 3, 2, 1];

    // When
    const steps = generateHeapSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
    expect(finalStep.stats.swaps).toBeGreaterThan(0);
  });

  test("중복 요소가 있는 배열을 처리해야 한다", () => {
    // Given: 중복 요소 포함
    const inputArray = [3, 1, 3, 1, 2];

    // When
    const steps = generateHeapSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 1, 2, 3, 3]);
  });

  test("단일 요소 배열을 처리해야 한다", () => {
    // Given
    const inputArray = [42];

    // When
    const steps = generateHeapSortSteps(inputArray);

    // Then
    expect(steps[0].array).toEqual([42]);
    expect(steps[steps.length - 1].array).toEqual([42]);
    expect(steps[steps.length - 1].stats.comparisons).toBe(0);
    expect(steps[steps.length - 1].stats.swaps).toBe(0);
  });

  test("빈 배열을 처리해야 한다", () => {
    // Given
    const inputArray: number[] = [];

    // When
    const steps = generateHeapSortSteps(inputArray);

    // Then
    expect(steps).toHaveLength(2); // 초기 + 최종
    expect(steps[0].array).toEqual([]);
    expect(steps[0].stats.comparisons).toBe(0);
    expect(steps[0].stats.swaps).toBe(0);
  });
});
