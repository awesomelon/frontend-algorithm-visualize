import { ArrayState } from "../types/sorting";

/**
 * 배열 상태에 따른 색상 클래스를 반환합니다.
 * @param state - 배열 요소의 현재 상태
 * @returns Tailwind CSS 색상 클래스
 */
export const getBarColor = (state: ArrayState): string => {
  switch (state) {
    case ArrayState.COMPARING:
      return "bg-yellow-400";
    case ArrayState.SWAPPING:
      return "bg-red-500";
    case ArrayState.SORTED:
      return "bg-green-500";
    case ArrayState.PIVOT:
      return "bg-purple-500";
    case ArrayState.MERGING:
      return "bg-blue-400";
    default:
      return "bg-blue-500";
  }
};
