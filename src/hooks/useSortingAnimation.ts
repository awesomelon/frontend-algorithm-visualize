import { useEffect } from "react";
import { SortingStep } from "../types/sorting";

interface UseSortingAnimationProps {
  isPlaying: boolean;
  currentStep: number;
  sortingSteps: SortingStep[];
  speed: number;
  onNextStep: () => void;
  onTogglePlay: () => void;
}

export const useSortingAnimation = ({
  isPlaying,
  currentStep,
  sortingSteps,
  speed,
  onNextStep,
  onTogglePlay,
}: UseSortingAnimationProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < sortingSteps.length - 1) {
      timer = setTimeout(() => {
        onNextStep();
      }, 1000 / speed);
    } else if (currentStep >= sortingSteps.length - 1 && isPlaying) {
      onTogglePlay();
    }

    return () => clearTimeout(timer);
  }, [
    isPlaying,
    currentStep,
    sortingSteps.length,
    speed,
    onNextStep,
    onTogglePlay,
  ]);
};
