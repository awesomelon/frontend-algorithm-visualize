import React, { useReducer, useEffect, useCallback } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";

import {
  ArrayState,
  AlgorithmType,
  SortingStep,
  Stats,
  sortingAlgorithms,
} from "../types/sorting";
import { algorithmMarkdown, getSortingSteps } from "../algorithms";
import ControlPanel from "./ControlPanel";
import PlaybackControls from "./PlaybackControls";
import AlgorithmDescription from "./AlgorithmDescription";
import SortingBars from "./SortingBars";
import Legend from "./Legend";
import CodeDisplay from "./CodeDisplay";

type State = {
  array: number[];
  arrayStates: ArrayState[];
  isPlaying: boolean;
  currentStep: number;
  sortingSteps: SortingStep[];
  speed: number;
  arraySize: number;
  selectedAlgorithm: AlgorithmType;
  stats: Stats;
  selectedLanguage: "javascript" | "java";
};

type Action =
  | {
      type: "GENERATE_ARRAY";
      payload: { array: number[]; states: ArrayState[]; stats: Stats };
    }
  | { type: "START_SORTING"; payload: { sortingSteps: SortingStep[] } }
  | { type: "NEXT_STEP" }
  | { type: "RESET" }
  | { type: "SET_SPEED"; payload: number }
  | { type: "SET_SIZE"; payload: number }
  | { type: "SET_ALGORITHM"; payload: AlgorithmType }
  | { type: "SET_LANGUAGE"; payload: "javascript" | "java" }
  | { type: "TOGGLE_PLAY" };

const initialState: State = {
  array: [],
  arrayStates: [],
  isPlaying: false,
  currentStep: 0,
  sortingSteps: [],
  speed: 1,
  arraySize: 15,
  selectedAlgorithm: "bubble",
  stats: { comparisons: 0, swaps: 0 },
  selectedLanguage: "javascript",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GENERATE_ARRAY":
      return {
        ...state,
        array: action.payload.array,
        arrayStates: action.payload.states,
        currentStep: 0,
        sortingSteps: [
          {
            array: action.payload.array,
            states: action.payload.states,
            stats: action.payload.stats,
          },
        ], // size 속성 제외
        isPlaying: false,
        stats: action.payload.stats,
      };
    case "START_SORTING":
      return {
        ...state,
        sortingSteps: action.payload.sortingSteps,
        currentStep: 0,
        isPlaying: true,
      };
    case "NEXT_STEP":
      const nextStep = state.sortingSteps[state.currentStep + 1];
      if (nextStep) {
        return {
          ...state,
          array: nextStep.array,
          arrayStates: nextStep.states,
          stats: nextStep.stats,
          currentStep: state.currentStep + 1,
        };
      } else {
        return { ...state, isPlaying: false };
      }
    case "RESET":
      const initialStep = state.sortingSteps[0];
      return {
        ...state,
        array: initialStep.array,
        arrayStates: initialStep.states,
        stats: initialStep.stats,
        currentStep: 0,
        isPlaying: false,
      };
    case "SET_SPEED":
      return { ...state, speed: action.payload };
    case "SET_SIZE":
      return { ...state, arraySize: action.payload };
    case "SET_ALGORITHM":
      return { ...state, selectedAlgorithm: action.payload };
    case "SET_LANGUAGE":
      return { ...state, selectedLanguage: action.payload };
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    default:
      return state;
  }
};

const SortingVisualizer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    array,
    arrayStates,
    isPlaying,
    currentStep,
    sortingSteps,
    speed,
    arraySize,
    selectedAlgorithm,
    stats,
    selectedLanguage,
  } = state;

  // 초기 배열 생성
  const generateArray = useCallback(
    (size: number = arraySize) => {
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 80) + 10,
      );
      const newStates = new Array(size).fill(ArrayState.UNSORTED);

      dispatch({
        type: "GENERATE_ARRAY",
        payload: {
          array: newArray,
          states: newStates,
          stats: { comparisons: 0, swaps: 0 },
        }, // size 속성 제외
      });
    },
    [arraySize],
  );

  // 정렬 알고리즘 선택에 따른 정렬 단계 생성
  const handleStartSorting = useCallback(() => {
    const steps = getSortingSteps(selectedAlgorithm, array);
    dispatch({ type: "START_SORTING", payload: { sortingSteps: steps } });
  }, [getSortingSteps, selectedAlgorithm, array]);

  // 배열 크기 변경 핸들러
  const handleSizeChange = useCallback(
    (newSize: number) => {
      dispatch({ type: "SET_SIZE", payload: newSize });
      generateArray(newSize);
    },
    [generateArray],
  );

  // 색상 스타일 가져오기
  const getBarColor = useCallback((state: ArrayState): string => {
    switch (state) {
      case ArrayState.COMPARING:
        return "bg-yellow-400";
      case ArrayState.SWAPPING:
        return "bg-red-500";
      case ArrayState.SORTED:
        return "bg-green-500";
      case ArrayState.PIVOT:
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  }, []);

  // 컴포넌트 마운트 시 초기 배열 생성
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // 애니메이션 실행
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < sortingSteps.length - 1) {
      timer = setTimeout(() => {
        dispatch({ type: "NEXT_STEP" });
      }, 1000 / speed);
    } else if (currentStep >= sortingSteps.length - 1 && isPlaying) {
      dispatch({ type: "TOGGLE_PLAY" });
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, sortingSteps.length, speed]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [selectedAlgorithm, selectedLanguage]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          알고리즘 비주얼라이저
        </h1>
        <p className="text-gray-600 mt-2">
          다양한 정렬 알고리즘의 동작 방식을 시각적으로 이해해보세요
        </p>
      </div>

      {/* 컨트롤 패널 */}
      <ControlPanel
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={(alg) =>
          dispatch({ type: "SET_ALGORITHM", payload: alg })
        }
        arraySize={arraySize}
        handleSizeChange={handleSizeChange}
        speed={speed}
        setSpeed={(spd) => dispatch({ type: "SET_SPEED", payload: spd })}
      />

      {/* 재생 컨트롤 */}
      <PlaybackControls
        isPlaying={isPlaying}
        togglePlay={() => dispatch({ type: "TOGGLE_PLAY" })}
        reset={() => dispatch({ type: "RESET" })}
        startSorting={handleStartSorting}
        stats={stats}
        disablePlay={currentStep >= sortingSteps.length - 1}
      />

      {/* 알고리즘 설명 */}
      <AlgorithmDescription
        selectedAlgorithm={selectedAlgorithm}
        sortingAlgorithms={sortingAlgorithms}
      />

      {/* 시각화 영역 */}
      <SortingBars
        array={array}
        arrayStates={arrayStates}
        getBarColor={getBarColor}
        arraySize={arraySize}
      />

      {/* 범례 */}
      <Legend />

      {/* 알고리즘 코드 */}
      <CodeDisplay
        selectedAlgorithm={selectedAlgorithm}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={(lang) =>
          dispatch({ type: "SET_LANGUAGE", payload: lang })
        }
        algorithmMarkdown={algorithmMarkdown}
      />
    </div>
  );
};

export default SortingVisualizer;
