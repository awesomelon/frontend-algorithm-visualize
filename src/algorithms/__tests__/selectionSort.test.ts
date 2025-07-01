import { describe, test, expect } from "vitest";
import { generateSelectionSortSteps } from "../selectionSort";
import { ArrayState } from "../../types/sorting";

describe("Selection Sort Algorithm", () => {
  test("정렬된 배열을 반환해야 한다", () => {
    // Given
    const inputArray = [64, 25, 12, 22, 11];
    const expectedSorted = [11, 12, 22, 25, 64];

    // When
    const steps = generateSelectionSortSteps(inputArray);

    // Then
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual(expectedSorted);
  });

  test("초기 상태에서 모든 요소가 UNSORTED 상태여야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateSelectionSortSteps(inputArray);

    // Then
    const initialStep = steps[0];
    expect(initialStep.states).toEqual([
      ArrayState.UNSORTED,
      ArrayState.UNSORTED,
      ArrayState.UNSORTED,
    ]);
  });

  test("최종 상태에서 모든 요소가 SORTED 상태여야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateSelectionSortSteps(inputArray);

    // Then
    const finalStep = steps[steps.length - 1];
    expect(finalStep.states).toEqual([
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
    ]);
  });

  test("PIVOT 상태가 올바르게 설정되어야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateSelectionSortSteps(inputArray);

    // Then: 첫 번째 단계에서 최솟값 찾기 과정 확인
    const pivotSteps = steps.filter((step) =>
      step.states.includes(ArrayState.PIVOT)
    );
    expect(pivotSteps.length).toBeGreaterThan(0);
  });

  test("통계 정보가 올바르게 계산되어야 한다", () => {
    // Given: [2, 1] - 2번 비교, 1번 교환 예상
    const inputArray = [2, 1];

    // When
    const steps = generateSelectionSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then: 선택 정렬의 특성상 n-1번 교환, 더 많은 비교
    expect(finalStep.stats.swaps).toBe(1);
    expect(finalStep.stats.comparisons).toBeGreaterThan(0);
  });

  test("빈 배열을 처리해야 한다", () => {
    // Given
    const inputArray: number[] = [];

    // When
    const steps = generateSelectionSortSteps(inputArray);

    // Then
    expect(steps).toHaveLength(2); // 초기 + 최종
    expect(steps[0].array).toEqual([]);
    expect(steps[0].stats.comparisons).toBe(0);
    expect(steps[0].stats.swaps).toBe(0);
  });
});
