import { describe, test, expect } from "vitest";
import { generateInsertionSortSteps } from "../insertionSort";
import { ArrayState } from "../../types/sorting";

describe("Insertion Sort Algorithm", () => {
  test("정렬된 배열을 반환해야 한다", () => {
    // Given
    const inputArray = [64, 25, 12, 22, 11];
    const expectedSorted = [11, 12, 22, 25, 64];

    // When
    const steps = generateInsertionSortSteps(inputArray);

    // Then
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual(expectedSorted);
  });

  test("초기 상태가 올바르게 설정되어야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateInsertionSortSteps(inputArray);

    // Then: 첫 번째 요소는 이미 정렬된 것으로 간주
    const secondStep = steps[1]; // 첫 번째 삽입 과정
    expect(secondStep.states[0]).toBe(ArrayState.SORTED);
  });

  test("최종 상태에서 모든 요소가 SORTED 상태여야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateInsertionSortSteps(inputArray);

    // Then
    const finalStep = steps[steps.length - 1];
    expect(finalStep.states).toEqual([
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
    ]);
  });

  test("COMPARING과 SWAPPING 상태가 올바르게 설정되어야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateInsertionSortSteps(inputArray);

    // Then: 비교 단계와 교환 단계가 존재해야 함
    const comparingSteps = steps.filter((step) =>
      step.states.includes(ArrayState.COMPARING)
    );
    const swappingSteps = steps.filter((step) =>
      step.states.includes(ArrayState.SWAPPING)
    );

    expect(comparingSteps.length).toBeGreaterThan(0);
    expect(swappingSteps.length).toBeGreaterThan(0);
  });

  test("이미 정렬된 배열에서는 교환이 발생하지 않아야 한다", () => {
    // Given: 이미 정렬된 배열
    const inputArray = [1, 2, 3, 4, 5];

    // When
    const steps = generateInsertionSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then: 교환 횟수가 0이어야 함
    expect(finalStep.stats.swaps).toBe(0);
    expect(finalStep.stats.comparisons).toBeGreaterThan(0); // 비교는 발생
  });

  test("역순 배열에서 최대 교환이 발생해야 한다", () => {
    // Given: 역순 배열
    const inputArray = [5, 4, 3, 2, 1];

    // When
    const steps = generateInsertionSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then: 많은 교환이 발생해야 함
    expect(finalStep.stats.swaps).toBeGreaterThan(5);
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
  });

  test("단일 요소 배열을 처리해야 한다", () => {
    // Given
    const inputArray = [42];

    // When
    const steps = generateInsertionSortSteps(inputArray);

    // Then
    expect(steps[0].array).toEqual([42]);
    expect(steps[steps.length - 1].array).toEqual([42]);
    expect(steps[steps.length - 1].stats.comparisons).toBe(0);
    expect(steps[steps.length - 1].stats.swaps).toBe(0);
  });
});
