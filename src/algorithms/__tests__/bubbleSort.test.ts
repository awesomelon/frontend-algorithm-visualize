import { describe, test, expect } from "vitest";
import { generateBubbleSortSteps } from "../bubbleSort";
import { ArrayState } from "../../types/sorting";

describe("Bubble Sort Algorithm", () => {
  test("정렬된 배열을 반환해야 한다", () => {
    // Given: 정렬되지 않은 배열
    const inputArray = [64, 34, 25, 12, 22, 11, 90];
    const expectedSorted = [11, 12, 22, 25, 34, 64, 90];

    // When: 버블 정렬 단계를 생성
    const steps = generateBubbleSortSteps(inputArray);

    // Then: 마지막 단계의 배열이 정렬되어 있어야 함
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual(expectedSorted);
  });

  test("초기 상태에서 모든 요소가 UNSORTED 상태여야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateBubbleSortSteps(inputArray);

    // Then: 첫 번째 단계의 모든 상태가 UNSORTED
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
    const steps = generateBubbleSortSteps(inputArray);

    // Then: 마지막 단계의 모든 상태가 SORTED
    const finalStep = steps[steps.length - 1];
    expect(finalStep.states).toEqual([
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
    ]);
  });

  test("통계 정보가 올바르게 계산되어야 한다", () => {
    // Given: 간단한 배열 [2, 1]
    const inputArray = [2, 1];

    // When
    const steps = generateBubbleSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then: 1번 비교, 1번 교환이 발생해야 함
    expect(finalStep.stats.comparisons).toBe(1);
    expect(finalStep.stats.swaps).toBe(1);
  });

  test("빈 배열을 처리해야 한다", () => {
    // Given
    const inputArray: number[] = [];

    // When
    const steps = generateBubbleSortSteps(inputArray);

    // Then
    expect(steps).toHaveLength(2); // 초기 상태 + 최종 상태
    expect(steps[0].array).toEqual([]);
    expect(steps[0].stats.comparisons).toBe(0);
    expect(steps[0].stats.swaps).toBe(0);
  });

  test("단일 요소 배열을 처리해야 한다", () => {
    // Given
    const inputArray = [42];

    // When
    const steps = generateBubbleSortSteps(inputArray);

    // Then
    expect(steps[0].array).toEqual([42]);
    expect(steps[steps.length - 1].array).toEqual([42]);
    expect(steps[steps.length - 1].stats.comparisons).toBe(0);
    expect(steps[steps.length - 1].stats.swaps).toBe(0);
  });
});
