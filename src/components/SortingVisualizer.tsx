import React, { useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  RefreshCcw,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

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
  AlgorithmMarkdown,
} from "../types/sorting";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arrayStates, setArrayStates] = useState<ArrayState[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
  const [speed, setSpeed] = useState<number>(1);
  const [arraySize, setArraySize] = useState<number>(15);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmType>("bubble");
  const [stats, setStats] = useState<Stats>({ comparisons: 0, swaps: 0 });
  const [selectedLanguage, setSelectedLanguage] = useState<
    "javascript" | "java"
  >("javascript");

  // 초기 배열 생성
  const generateArray = useCallback(
    (size: number = arraySize): SortingStep => {
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 80) + 10,
      );
      const newStates = new Array(size).fill(ArrayState.UNSORTED);

      setArray(newArray);
      setArrayStates(newStates);
      setCurrentStep(0);
      setSortingSteps([]);
      setIsPlaying(false);
      setStats({ comparisons: 0, swaps: 0 });

      return {
        array: newArray,
        states: newStates,
        stats: { comparisons: 0, swaps: 0 },
      };
    },
    [arraySize],
  );

  const algorithmMarkdown: AlgorithmMarkdown = {
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
  };

  // 배열 크기 변경 핸들러
  const handleSizeChange = useCallback(
    (newSize: number) => {
      setArraySize(newSize);
      generateArray(newSize);
    },
    [generateArray],
  );

  // 정렬 알고리즘 구현
  const getSortingSteps = useCallback((): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let comparisons = 0;
    let swaps = 0;

    // 초기 상태 추가
    steps.push({
      array: [...arr],
      states: new Array(arr.length).fill(ArrayState.UNSORTED),
      stats: { comparisons, swaps },
    });

    switch (selectedAlgorithm) {
      case "bubble": {
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            comparisons++;

            // 비교 상태 추가
            steps.push({
              array: [...arr],
              states: Array(arr.length)
                .fill(ArrayState.UNSORTED)
                .map((_, index) => {
                  if (index === j || index === j + 1)
                    return ArrayState.COMPARING;
                  if (index >= arr.length - i) return ArrayState.SORTED;
                  return ArrayState.UNSORTED;
                }),
              stats: { comparisons, swaps },
            });

            if (arr[j] > arr[j + 1]) {
              swaps++;
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

              // 교환 상태 추가
              steps.push({
                array: [...arr],
                states: Array(arr.length)
                  .fill(ArrayState.UNSORTED)
                  .map((_, index) => {
                    if (index === j || index === j + 1)
                      return ArrayState.SWAPPING;
                    if (index >= arr.length - i) return ArrayState.SORTED;
                    return ArrayState.UNSORTED;
                  }),
                stats: { comparisons, swaps },
              });
            }
          }
        }
        break;
      }

      case "selection": {
        for (let i = 0; i < arr.length - 1; i++) {
          let minIdx = i;

          for (let j = i + 1; j < arr.length; j++) {
            comparisons++;
            steps.push({
              array: [...arr],
              states: Array(arr.length)
                .fill(ArrayState.UNSORTED)
                .map((_, index) => {
                  if (index === j) return ArrayState.COMPARING;
                  if (index === minIdx) return ArrayState.PIVOT;
                  if (index < i) return ArrayState.SORTED;
                  return ArrayState.UNSORTED;
                }),
              stats: { comparisons, swaps },
            });

            if (arr[j] < arr[minIdx]) {
              minIdx = j;
            }
          }

          if (minIdx !== i) {
            swaps++;
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({
              array: [...arr],
              states: Array(arr.length)
                .fill(ArrayState.UNSORTED)
                .map((_, index) => {
                  if (index === i || index === minIdx)
                    return ArrayState.SWAPPING;
                  if (index < i) return ArrayState.SORTED;
                  return ArrayState.UNSORTED;
                }),
              stats: { comparisons, swaps },
            });
          }
        }
        break;
      }

      case "insertion": {
        for (let i = 1; i < arr.length; i++) {
          const key = arr[i];
          let j = i - 1;

          steps.push({
            array: [...arr],
            states: Array(arr.length)
              .fill(ArrayState.UNSORTED)
              .map((_, index) => {
                if (index === i) return ArrayState.PIVOT;
                if (index < i) return ArrayState.SORTED;
                return ArrayState.UNSORTED;
              }),
            stats: { comparisons, swaps },
          });

          while (j >= 0 && arr[j] > key) {
            comparisons++;
            swaps++;
            arr[j + 1] = arr[j];

            steps.push({
              array: [...arr],
              states: Array(arr.length)
                .fill(ArrayState.UNSORTED)
                .map((_, index) => {
                  if (index === j || index === j + 1)
                    return ArrayState.SWAPPING;
                  if (index < j) return ArrayState.SORTED;
                  return ArrayState.UNSORTED;
                }),
              stats: { comparisons, swaps },
            });

            j--;
          }
          arr[j + 1] = key;
        }
        break;
      }

      case "quick": {
        const quickSort = (left: number, right: number) => {
          if (left >= right) return;

          const pivot = arr[right];
          let i = left - 1;

          steps.push({
            array: [...arr],
            states: Array(arr.length)
              .fill(ArrayState.UNSORTED)
              .map((_, index) => {
                if (index === right) return ArrayState.PIVOT;
                return ArrayState.UNSORTED;
              }),
            stats: { comparisons, swaps },
          });

          for (let j = left; j < right; j++) {
            comparisons++;

            steps.push({
              array: [...arr],
              states: Array(arr.length)
                .fill(ArrayState.UNSORTED)
                .map((_, index) => {
                  if (index === j) return ArrayState.COMPARING;
                  if (index === right) return ArrayState.PIVOT;
                  return ArrayState.UNSORTED;
                }),
              stats: { comparisons, swaps },
            });

            if (arr[j] <= pivot) {
              i++;
              swaps++;
              [arr[i], arr[j]] = [arr[j], arr[i]];

              steps.push({
                array: [...arr],
                states: Array(arr.length)
                  .fill(ArrayState.UNSORTED)
                  .map((_, index) => {
                    if (index === i || index === j) return ArrayState.SWAPPING;
                    if (index === right) return ArrayState.PIVOT;
                    return ArrayState.UNSORTED;
                  }),
                stats: { comparisons, swaps },
              });
            }
          }

          swaps++;
          [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

          steps.push({
            array: [...arr],
            states: Array(arr.length)
              .fill(ArrayState.UNSORTED)
              .map((_, index) => {
                if (index === i + 1 || index === right)
                  return ArrayState.SWAPPING;
                return ArrayState.UNSORTED;
              }),
            stats: { comparisons, swaps },
          });

          quickSort(left, i);
          quickSort(i + 2, right);
        };

        quickSort(0, arr.length - 1);
        break;
      }
    }

    // 최종 정렬 완료 상태 추가
    steps.push({
      array: arr,
      states: new Array(arr.length).fill(ArrayState.SORTED),
      stats: { comparisons, swaps },
    });

    return steps;
  }, [array, selectedAlgorithm]);

  // 정렬 시작
  const startSorting = useCallback(() => {
    const steps = getSortingSteps();
    setSortingSteps(steps);
    setCurrentStep(0);
    setIsPlaying(true);
  }, [getSortingSteps]);

  // 색상 스타일 가져오기
  const getBarColor = (state: ArrayState): string => {
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
  };

  // 컴포넌트 마운트 시 초기 배열 생성
  useEffect(() => {
    const initialState = generateArray();
    setSortingSteps([initialState]);
  }, [generateArray]);

  // 애니메이션 실행
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < sortingSteps.length - 1) {
      timer = setTimeout(() => {
        const nextStep = sortingSteps[currentStep + 1];
        if (nextStep) {
          setArray(nextStep.array);
          setArrayStates(nextStep.states);
          setStats(nextStep.stats);
          setCurrentStep((prev) => prev + 1);
        }
      }, 1000 / speed);
    } else if (currentStep >= sortingSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, sortingSteps, speed]);

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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <select
            value={selectedAlgorithm}
            onChange={(e) =>
              setSelectedAlgorithm(e.target.value as AlgorithmType)
            }
            className="px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(sortingAlgorithms).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">배열 크기:</span>
              <button
                onClick={() => handleSizeChange(Math.max(5, arraySize - 5))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <span className="w-8 text-center">{arraySize}</span>
              <button
                onClick={() => handleSizeChange(Math.min(50, arraySize + 5))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">속도:</span>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.5}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 재생 컨트롤 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCurrentStep(0);
                if (sortingSteps.length > 0) {
                  const initialStep = sortingSteps[0];
                  setArray(initialStep.array);
                  setArrayStates(initialStep.states);
                  setStats(initialStep.stats);
                }
                setIsPlaying(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentStep >= sortingSteps.length - 1}
              className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => generateArray()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-600">비교 횟수:</span>{" "}
              <span className="font-medium">{stats.comparisons}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">교환 횟수:</span>{" "}
              <span className="font-medium">{stats.swaps}</span>
            </div>
          </div>

          <button
            onClick={startSorting}
            disabled={isPlaying}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            정렬 시작
          </button>
        </div>
      </div>

      {/* 알고리즘 설명 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="space-y-2">
          <div>
            <span className="font-medium">시간 복잡도:</span>{" "}
            <span className="text-gray-600">
              {sortingAlgorithms[selectedAlgorithm].complexity}
            </span>
          </div>
          <p className="text-gray-600">
            {sortingAlgorithms[selectedAlgorithm].description}
          </p>
        </div>
      </div>

      {/* 시각화 영역 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="w-full h-[400px] flex items-end justify-center gap-1">
          {array.map((value, index) => (
            <div
              key={index}
              style={{
                height: `${(value / 100) * 100}%`,
                width: `${Math.max(8, Math.min(20, Math.floor(800 / arraySize)))}px`,
                transition: "all 0.3s ease",
              }}
              className={`${getBarColor(arrayStates[index])} rounded-t-md transform hover:brightness-110`}
              role="presentation"
              aria-label={`Value: ${value}`}
            />
          ))}
        </div>
      </div>

      {/* 범례 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <span className="text-sm">미정렬</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
            <span className="text-sm">비교 중</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <span className="text-sm">교환 중</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <span className="text-sm">피벗</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-sm">정렬 완료</span>
          </div>
        </div>
      </div>
      {/* 알고리즘 코드 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">구현 코드</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            {["javascript", "java"].map((lang) => (
              <button
                key={lang}
                className={`px-4 py-2 rounded-md ${
                  selectedLanguage === lang
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedLanguage(lang as "javascript" | "java")
                }
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <ReactMarkdown
              className={`prose max-w-none dark:prose-invert p-4 language-${selectedLanguage}`}
            >
              {algorithmMarkdown[selectedAlgorithm][selectedLanguage]}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
