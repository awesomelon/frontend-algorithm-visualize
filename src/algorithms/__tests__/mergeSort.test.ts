import { describe, test, expect } from "vitest";
import { generateMergeSortSteps } from "../mergeSort";
import { ArrayState } from "../../types/sorting";

describe("Merge Sort Algorithm", () => {
  test("정렬된 배열을 반환해야 한다", () => {
    // Given
    const inputArray = [64, 25, 12, 22, 11, 90, 5];
    const expectedSorted = [5, 11, 12, 22, 25, 64, 90];

    // When
    const steps = generateMergeSortSteps(inputArray);

    // Then
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual(expectedSorted);
  });

  test("MERGING 상태가 설정되어야 한다", () => {
    // Given
    const inputArray = [3, 1, 4, 1, 5];

    // When
    const steps = generateMergeSortSteps(inputArray);

    // Then: 병합 상태가 존재해야 함
    const mergingSteps = steps.filter((step) =>
      step.states.includes(ArrayState.MERGING)
    );
    expect(mergingSteps.length).toBeGreaterThan(0);
  });

  test("COMPARING 상태가 설정되어야 한다", () => {
    // Given
    const inputArray = [3, 1, 4, 1, 5];

    // When
    const steps = generateMergeSortSteps(inputArray);

    // Then: 비교 상태가 존재해야 함
    const comparingSteps = steps.filter((step) =>
      step.states.includes(ArrayState.COMPARING)
    );
    expect(comparingSteps.length).toBeGreaterThan(0);
  });

  test("최종 상태에서 모든 요소가 SORTED 상태여야 한다", () => {
    // Given
    const inputArray = [3, 1, 2];

    // When
    const steps = generateMergeSortSteps(inputArray);

    // Then
    const finalStep = steps[steps.length - 1];
    expect(finalStep.states).toEqual([
      ArrayState.SORTED,
      ArrayState.SORTED,
      ArrayState.SORTED,
    ]);
  });

  test("이미 정렬된 배열을 처리해야 한다", () => {
    // Given: 이미 정렬된 배열
    const inputArray = [1, 2, 3, 4, 5];

    // When
    const steps = generateMergeSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
    expect(finalStep.stats.comparisons).toBeGreaterThan(0);
  });

  test("역순 배열을 처리해야 한다", () => {
    // Given: 역순 배열
    const inputArray = [5, 4, 3, 2, 1];

    // When
    const steps = generateMergeSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
    expect(finalStep.stats.comparisons).toBeGreaterThan(0);
  });

  test("중복 요소가 있는 배열을 처리해야 한다", () => {
    // Given: 중복 요소 포함
    const inputArray = [3, 1, 3, 1, 2];

    // When
    const steps = generateMergeSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 1, 2, 3, 3]);
  });

  test("짝수 길이 배열을 처리해야 한다", () => {
    // Given: 짝수 길이 배열
    const inputArray = [4, 3, 2, 1];

    // When
    const steps = generateMergeSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 2, 3, 4]);
  });

  test("홀수 길이 배열을 처리해야 한다", () => {
    // Given: 홀수 길이 배열
    const inputArray = [5, 4, 3, 2, 1];

    // When
    const steps = generateMergeSortSteps(inputArray);
    const finalStep = steps[steps.length - 1];

    // Then
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
  });

  test("단일 요소 배열을 처리해야 한다", () => {
    // Given
    const inputArray = [42];

    // When
    const steps = generateMergeSortSteps(inputArray);

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
    const steps = generateMergeSortSteps(inputArray);

    // Then
    expect(steps).toHaveLength(2); // 초기 + 최종
    expect(steps[0].array).toEqual([]);
    expect(steps[0].stats.comparisons).toBe(0);
    expect(steps[0].stats.swaps).toBe(0);
  });
});
